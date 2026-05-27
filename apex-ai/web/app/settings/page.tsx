import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Settings</h1>
        <p className="text-text-secondary text-sm mt-1">Manage your organization and account</p>
      </div>

      {/* Org */}
      <Card>
        <h2 className="text-sm font-semibold text-text-primary mb-4">Organization</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-text-secondary block mb-1.5">Organization name</label>
            <input
              type="text"
              defaultValue="Apex AI"
              className="w-full bg-bg-elevated border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-text-secondary block mb-1.5">Slug</label>
            <div className="flex items-center gap-0">
              <span className="bg-bg-base border border-r-0 border-border rounded-l-md px-3 py-2 text-sm text-text-secondary">app.apexai.com/</span>
              <input
                type="text"
                defaultValue="apex-ai"
                className="flex-1 bg-bg-elevated border border-border rounded-r-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button size="sm">Save changes</Button>
        </div>
      </Card>

      {/* API Keys */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-text-primary">API Keys</h2>
          <Button variant="secondary" size="sm">Generate key</Button>
        </div>
        <div className="space-y-2">
          {[
            { name: "Production key", key: "sk-apex-••••••••••••••••4f2a", created: "May 1, 2026", last: "2 min ago" },
            { name: "Dev key", key: "sk-apex-••••••••••••••••9b11", created: "Apr 15, 2026", last: "3 days ago" },
          ].map((k) => (
            <div key={k.name} className="flex items-center gap-3 bg-bg-elevated rounded-md px-3 py-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{k.name}</p>
                <p className="text-xs text-text-secondary font-mono mt-0.5">{k.key}</p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-xs text-text-secondary">Created {k.created}</p>
                <p className="text-xs text-text-secondary">Last used {k.last}</p>
              </div>
              <button className="text-xs text-danger hover:underline">Revoke</button>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger zone */}
      <Card className="border-danger/30">
        <h2 className="text-sm font-semibold text-danger mb-4">Danger zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-primary">Delete organization</p>
            <p className="text-xs text-text-secondary mt-0.5">This will permanently delete all data. This cannot be undone.</p>
          </div>
          <Button variant="danger" size="sm">Delete org</Button>
        </div>
      </Card>
    </div>
  );
}
