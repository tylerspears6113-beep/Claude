#!/usr/bin/env python3
"""Autonomous research agent using Claude and web search."""

import json
import os
import sys
from typing import Any

import anthropic
from duckduckgo_search import DDGS
import requests
from bs4 import BeautifulSoup


MODEL = os.getenv("AGENT_MODEL", "claude-opus-4-8")
MAX_ITERATIONS = int(os.getenv("AGENT_MAX_ITERATIONS", "15"))

client = anthropic.Anthropic()

TOOLS = [
    {
        "name": "web_search",
        "description": (
            "Search the web for information. Returns a list of results with "
            "titles, URLs, and snippets. Use this to find relevant sources."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "The search query"},
                "max_results": {
                    "type": "integer",
                    "description": "Number of results to return (default 5, max 10)",
                    "default": 5,
                },
            },
            "required": ["query"],
        },
    },
    {
        "name": "fetch_page",
        "description": (
            "Fetch and read the text content of a web page. "
            "Use this to read the full content of a promising source."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "url": {"type": "string", "description": "The URL to fetch"},
            },
            "required": ["url"],
        },
    },
]

SYSTEM_PROMPT = """You are an autonomous research agent. Your goal is to thoroughly research a topic and produce a comprehensive, well-cited report.

Process:
1. Break the question into sub-questions
2. Use web_search to find relevant sources
3. Use fetch_page to read key sources in full
4. Cross-reference claims across multiple sources
5. Synthesize findings into a structured final report

Report format:
- Clear section headers
- Key findings as bullet points where appropriate
- Inline citations as [Source: <title>, <url>]
- A "Sources" section at the end listing all references

Be thorough but efficient. Stop searching when you have enough to answer comprehensively."""


def web_search(query: str, max_results: int = 5) -> list[dict]:
    max_results = min(max_results, 10)
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=max_results))
        return [{"title": r["title"], "url": r["href"], "snippet": r["body"]} for r in results]
    except Exception as e:
        return [{"error": str(e)}]


def fetch_page(url: str) -> str:
    try:
        headers = {"User-Agent": "Mozilla/5.0 (compatible; ResearchAgent/1.0)"}
        resp = requests.get(url, headers=headers, timeout=12)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        for tag in soup(["script", "style", "nav", "footer", "header", "aside", "form"]):
            tag.decompose()
        text = soup.get_text(separator="\n", strip=True)
        # Cap at ~8k chars to stay within context budget
        if len(text) > 8000:
            text = text[:8000] + "\n\n[...content truncated...]"
        return text
    except Exception as e:
        return f"Error fetching page: {e}"


def handle_tool(name: str, inputs: dict[str, Any]) -> str:
    if name == "web_search":
        results = web_search(inputs["query"], inputs.get("max_results", 5))
        return json.dumps(results, indent=2)
    if name == "fetch_page":
        return fetch_page(inputs["url"])
    return f"Unknown tool: {name}"


def run_agent(question: str) -> str:
    print(f"\nResearching: {question}")
    print("=" * 60)

    messages: list[dict] = [{"role": "user", "content": question}]

    # Cache the system prompt to reduce costs on long research sessions
    system = [
        {
            "type": "text",
            "text": SYSTEM_PROMPT,
            "cache_control": {"type": "ephemeral"},
        }
    ]

    for iteration in range(MAX_ITERATIONS):
        response = client.messages.create(
            model=MODEL,
            max_tokens=4096,
            system=system,
            tools=TOOLS,
            messages=messages,
            betas=["prompt-caching-2024-07-31"],
        )

        if response.stop_reason == "end_turn":
            for block in response.content:
                if hasattr(block, "text"):
                    return block.text
            return "No final response generated."

        tool_calls = [b for b in response.content if b.type == "tool_use"]
        if not tool_calls:
            for block in response.content:
                if hasattr(block, "text"):
                    return block.text
            break

        messages.append({"role": "assistant", "content": response.content})

        tool_results = []
        for call in tool_calls:
            args_preview = json.dumps(call.input)[:80]
            print(f"  [{iteration + 1}] {call.name}({args_preview}{'...' if len(json.dumps(call.input)) > 80 else ''})")
            result = handle_tool(call.name, call.input)
            tool_results.append(
                {"type": "tool_result", "tool_use_id": call.id, "content": result}
            )

        messages.append({"role": "user", "content": tool_results})

    return "Reached maximum iterations without a complete answer."


def main() -> None:
    if len(sys.argv) > 1:
        question = " ".join(sys.argv[1:])
    else:
        print("Autonomous Research Agent")
        print(f"Model: {MODEL} | Max iterations: {MAX_ITERATIONS}")
        print("Enter your research question (Ctrl+C to exit):")
        try:
            question = input("> ").strip()
        except (KeyboardInterrupt, EOFError):
            sys.exit(0)
        if not question:
            print("No question provided.")
            sys.exit(1)

    report = run_agent(question)
    print(f"\n{'=' * 60}")
    print("FINAL REPORT")
    print("=" * 60)
    print(report)


if __name__ == "__main__":
    main()
