import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Search, Plug } from "lucide-react";

const installed = [
  { name: "HubSpot", category: "CRM", status: "active", runs: 842, icon: "H" },
  { name: "Slack", category: "Messaging", status: "active", runs: 311, icon: "S" },
  { name: "Webhook (Generic)", category: "HTTP", status: "active", runs: 131, icon: "W" },
];

const catalog = [
  { name: "Salesforce", category: "CRM", description: "Sync leads, contacts, and opportunities" },
  { name: "Gmail", category: "Email", description: "Trigger workflows on incoming emails" },
  { name: "Notion", category: "Productivity", description: "Read and write Notion pages and databases" },
  { name: "Stripe", category: "Payments", description: "React to payment events and invoices" },
  { name: "Airtable", category: "Database", description: "Query and update Airtable bases" },
  { name: "Google Sheets", category: "Productivity", description: "Read and append rows to spreadsheets" },
];

export default function IntegrationsPage() {
  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Integrations</h1>
          <p className="text-text-secondary text-sm mt-1">Connect your tools to Apex AI</p>
        </div>
        <Button size="sm">
          <Plus size={14} /> New connector
        </Button>
      </div>

      {/* Installed */}
      <div>
        <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">Installed</h2>
        <div className="space-y-2">
          {installed.map((integration) => (
            <div key={integration.name} className="bg-bg-surface border border-border rounded-lg px-4 py-3 flex items-center gap-4">
              <div className="w-9 h-9 rounded-md bg-bg-elevated border border-border flex items-center justify-center text-sm font-bold text-text-primary shrink-0">
                {integration.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{integration.name}</p>
                <p className="text-xs text-text-secondary">{integration.category} · {integration.runs.toLocaleString()} runs</p>
              </div>
              <Badge variant="success">Active</Badge>
              <Button variant="ghost" size="sm">Configure</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Available connectors</h2>
          <div className="flex items-center gap-2 bg-bg-surface border border-border rounded-md px-3 py-1.5">
            <Search size={13} className="text-text-secondary" />
            <input
              type="text"
              placeholder="Search connectors..."
              className="bg-transparent text-sm text-text-primary placeholder-text-secondary outline-none w-40"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {catalog.map((item) => (
            <Card key={item.name} className="hover:border-accent/40 transition-colors cursor-pointer group">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-bg-elevated border border-border flex items-center justify-center text-sm font-bold text-text-primary shrink-0">
                  {item.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{item.name}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{item.description}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Badge variant="outline">{item.category}</Badge>
                <button className="text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <Plug size={11} /> Connect
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
