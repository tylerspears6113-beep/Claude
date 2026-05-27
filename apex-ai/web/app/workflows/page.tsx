import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Play, Pause, MoreHorizontal, GitBranch } from "lucide-react";

const workflows = [
  {
    id: "wf_01",
    name: "Summarize Support Tickets",
    trigger: "Webhook",
    model: "claude-3-5-sonnet",
    status: "active",
    runs: 284,
    lastRun: "2m ago",
    successRate: 99.1,
  },
  {
    id: "wf_02",
    name: "Lead Enrichment – HubSpot",
    trigger: "HubSpot: New Contact",
    model: "gpt-4o",
    status: "active",
    runs: 512,
    lastRun: "5m ago",
    successRate: 97.8,
  },
  {
    id: "wf_03",
    name: "Weekly Report Draft",
    trigger: "Schedule: Mon 9am",
    model: "claude-3-5-sonnet",
    status: "active",
    runs: 12,
    lastRun: "12m ago",
    successRate: 83.3,
  },
  {
    id: "wf_04",
    name: "Slack Digest – #engineering",
    trigger: "Schedule: Daily 6pm",
    model: "gpt-4o-mini",
    status: "paused",
    runs: 45,
    lastRun: "2d ago",
    successRate: 100,
  },
  {
    id: "wf_05",
    name: "Invoice Parser",
    trigger: "Webhook",
    model: "claude-3-5-sonnet",
    status: "active",
    runs: 88,
    lastRun: "31m ago",
    successRate: 98.9,
  },
];

export default function WorkflowsPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Workflows</h1>
          <p className="text-text-secondary text-sm mt-1">Automate tasks with AI</p>
        </div>
        <Button size="sm">
          <Plus size={14} /> New workflow
        </Button>
      </div>

      <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Trigger</th>
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider hidden md:table-cell">Model</th>
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider hidden md:table-cell">Success</th>
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">Last run</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {workflows.map((wf, i) => (
              <tr key={wf.id} className={`hover:bg-bg-elevated transition-colors cursor-pointer ${i < workflows.length - 1 ? "border-b border-border" : ""}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded bg-accent/15 flex items-center justify-center shrink-0">
                      <GitBranch size={13} className="text-accent" />
                    </div>
                    <span className="font-medium text-text-primary">{wf.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">{wf.trigger}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="font-mono text-xs text-text-secondary">{wf.model}</span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={wf.status === "active" ? "success" : "outline"}>
                    {wf.status === "active" ? "Active" : "Paused"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{wf.successRate}%</td>
                <td className="px-4 py-3 text-text-secondary">{wf.lastRun}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {wf.status === "active" ? (
                      <button className="p-1.5 rounded hover:bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors">
                        <Pause size={13} />
                      </button>
                    ) : (
                      <button className="p-1.5 rounded hover:bg-bg-elevated text-text-secondary hover:text-accent transition-colors">
                        <Play size={13} />
                      </button>
                    )}
                    <button className="p-1.5 rounded hover:bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors">
                      <MoreHorizontal size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
