import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock, Search, Filter } from "lucide-react";

const logs = [
  { id: "run_1284", workflow: "Summarize Support Tickets", status: "success", model: "claude-3-5-sonnet", duration: "1.2s", cost: "$0.003", time: "2m ago" },
  { id: "run_1283", workflow: "Lead Enrichment – HubSpot", status: "success", model: "gpt-4o", duration: "3.7s", cost: "$0.008", time: "5m ago" },
  { id: "run_1282", workflow: "Weekly Report Draft", status: "error", model: "claude-3-5-sonnet", duration: "0.4s", cost: "$0.001", time: "12m ago" },
  { id: "run_1281", workflow: "Slack Digest – #engineering", status: "pending", model: "gpt-4o-mini", duration: "—", cost: "—", time: "14m ago" },
  { id: "run_1280", workflow: "Invoice Parser", status: "success", model: "claude-3-5-sonnet", duration: "2.1s", cost: "$0.005", time: "31m ago" },
  { id: "run_1279", workflow: "Summarize Support Tickets", status: "success", model: "claude-3-5-sonnet", duration: "1.4s", cost: "$0.003", time: "45m ago" },
  { id: "run_1278", workflow: "Lead Enrichment – HubSpot", status: "success", model: "gpt-4o", duration: "4.1s", cost: "$0.009", time: "1h ago" },
  { id: "run_1277", workflow: "Invoice Parser", status: "error", model: "claude-3-5-sonnet", duration: "0.2s", cost: "$0.000", time: "1h ago" },
];

const statusIcon = {
  success: <CheckCircle2 size={13} className="text-success" />,
  error: <AlertCircle size={13} className="text-danger" />,
  pending: <Clock size={13} className="text-warning" />,
};

const statusBadge = {
  success: "success" as const,
  error: "danger" as const,
  pending: "warning" as const,
};

export default function LogsPage() {
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Logs</h1>
          <p className="text-text-secondary text-sm mt-1">All workflow run history</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-bg-surface border border-border rounded-md px-3 py-1.5">
            <Search size={13} className="text-text-secondary" />
            <input
              type="text"
              placeholder="Search runs..."
              className="bg-transparent text-sm text-text-primary placeholder-text-secondary outline-none w-36"
            />
          </div>
          <button className="flex items-center gap-1.5 bg-bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
            <Filter size={13} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">Run ID</th>
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">Workflow</th>
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider hidden md:table-cell">Model</th>
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Duration</th>
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Cost</th>
              <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={log.id} className={`hover:bg-bg-elevated transition-colors cursor-pointer group ${i < logs.length - 1 ? "border-b border-border" : ""}`}>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">{log.id}</span>
                </td>
                <td className="px-4 py-3 text-text-primary">{log.workflow}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {statusIcon[log.status as keyof typeof statusIcon]}
                    <Badge variant={statusBadge[log.status as keyof typeof statusBadge]}>
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </Badge>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="font-mono text-xs text-text-secondary">{log.model}</span>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden lg:table-cell font-mono">{log.duration}</td>
                <td className="px-4 py-3 text-text-secondary hidden lg:table-cell font-mono">{log.cost}</td>
                <td className="px-4 py-3 text-text-secondary">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
