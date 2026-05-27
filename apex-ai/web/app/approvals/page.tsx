import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const pending = [
  {
    id: "apr_01",
    workflow: "Lead Enrichment – HubSpot",
    action: "Send enriched contact data to HubSpot CRM",
    input: "New contact: Sarah Chen, Acme Corp, sarah@acme.com",
    output: "Enriched with: LinkedIn profile, company size (500–1000), industry (SaaS), role seniority (Director)",
    model: "gpt-4o",
    requestedAt: "3 min ago",
  },
  {
    id: "apr_02",
    workflow: "Summarize Support Tickets",
    action: "Post AI summary to #support-digest Slack channel",
    input: "12 new tickets since last digest",
    output: "Top issues: (1) Login failures on Safari — 4 tickets, (2) CSV export timeout — 3 tickets, (3) Billing confusion — 2 tickets. Recommend escalating #1.",
    model: "claude-3-5-sonnet",
    requestedAt: "11 min ago",
  },
  {
    id: "apr_03",
    workflow: "Weekly Report Draft",
    action: "Create Notion page: Weekly AI Report – Week 22",
    input: "Usage data: 8,420 runs, $29.40 cost, 97.1% success rate",
    output: "Draft report with executive summary, highlights, and 3 recommended workflow optimizations.",
    model: "claude-3-5-sonnet",
    requestedAt: "22 min ago",
  },
];

export default function ApprovalsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Approvals</h1>
          <p className="text-text-secondary text-sm mt-1">Review AI actions before they execute</p>
        </div>
        <Badge variant="warning" className="text-sm px-3 py-1">
          <Clock size={12} className="mr-1" />
          {pending.length} pending
        </Badge>
      </div>

      <div className="space-y-4">
        {pending.map((item) => (
          <div key={item.id} className="bg-bg-surface border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">{item.workflow}</p>
                <p className="text-xs text-text-secondary mt-0.5">Requested {item.requestedAt} · <span className="font-mono">{item.model}</span></p>
              </div>
              <Badge variant="warning">Pending approval</Badge>
            </div>

            <div className="px-5 py-4 space-y-3">
              <div>
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">Proposed action</p>
                <p className="text-sm text-text-primary">{item.action}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-bg-elevated rounded-md p-3">
                  <p className="text-xs font-medium text-text-secondary mb-1.5">Input</p>
                  <p className="text-xs text-text-primary font-mono leading-relaxed">{item.input}</p>
                </div>
                <div className="bg-bg-elevated rounded-md p-3">
                  <p className="text-xs font-medium text-text-secondary mb-1.5">AI output</p>
                  <p className="text-xs text-text-primary font-mono leading-relaxed">{item.output}</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-bg-elevated border-t border-border flex items-center gap-2">
              <Button size="sm">
                <CheckCircle2 size={13} /> Approve
              </Button>
              <Button variant="danger" size="sm">
                <XCircle size={13} /> Reject
              </Button>
              <Button variant="ghost" size="sm" className="ml-auto">
                Edit & approve
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
