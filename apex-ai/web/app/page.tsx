import { Card, CardTitle, CardValue } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Plug,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const stats = [
  { label: "Active Integrations", value: "12", icon: Plug, trend: "+2 this week" },
  { label: "Runs Today", value: "1,284", icon: Activity, trend: "+18% vs yesterday" },
  { label: "Success Rate", value: "98.4%", icon: TrendingUp, trend: "Last 7 days" },
  { label: "Est. Cost Today", value: "$4.21", icon: DollarSign, trend: "of $50 limit" },
];

const recentRuns = [
  { id: "run_01", workflow: "Summarize Support Tickets", status: "success", duration: "1.2s", time: "2m ago" },
  { id: "run_02", workflow: "Lead Enrichment – HubSpot", status: "success", duration: "3.7s", time: "5m ago" },
  { id: "run_03", workflow: "Weekly Report Draft", status: "error", duration: "0.4s", time: "12m ago" },
  { id: "run_04", workflow: "Slack Digest – #engineering", status: "pending", duration: "—", time: "14m ago" },
  { id: "run_05", workflow: "Invoice Parser", status: "success", duration: "2.1s", time: "31m ago" },
];

const statusConfig = {
  success: { label: "Success", variant: "success" as const, icon: CheckCircle2 },
  error: { label: "Error", variant: "danger" as const, icon: AlertCircle },
  pending: { label: "Pending", variant: "warning" as const, icon: Clock },
};

export default function DashboardPage() {
  return (
    <div className="max-w-6xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">Overview of your AI integrations</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-start justify-between mb-3">
              <CardTitle>{stat.label}</CardTitle>
              <stat.icon size={16} className="text-text-secondary shrink-0" />
            </div>
            <CardValue>{stat.value}</CardValue>
            <p className="text-xs text-text-secondary mt-1">{stat.trend}</p>
          </Card>
        ))}
      </div>

      {/* Recent runs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium text-text-primary">Recent Runs</h2>
          <Button variant="ghost" size="sm" className="gap-1">
            View all <ArrowRight size={13} />
          </Button>
        </div>
        <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">Workflow</th>
                <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider hidden md:table-cell">Duration</th>
                <th className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentRuns.map((run, i) => {
                const status = statusConfig[run.status as keyof typeof statusConfig];
                return (
                  <tr key={run.id} className={`hover:bg-bg-elevated transition-colors cursor-pointer ${i < recentRuns.length - 1 ? "border-b border-border" : ""}`}>
                    <td className="px-4 py-3 text-text-primary font-medium">{run.workflow}</td>
                    <td className="px-4 py-3">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td className="px-4 py-3 text-text-secondary font-mono hidden md:table-cell">{run.duration}</td>
                    <td className="px-4 py-3 text-text-secondary">{run.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Errors callout */}
      <div className="bg-danger/10 border border-danger/30 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle size={16} className="text-danger mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-text-primary">1 workflow failed in the last hour</p>
          <p className="text-xs text-text-secondary mt-0.5">Weekly Report Draft — prompt returned an empty response. <span className="text-accent cursor-pointer hover:underline">View details →</span></p>
        </div>
      </div>
    </div>
  );
}
