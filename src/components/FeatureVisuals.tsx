/**
 * Small, self-contained "product screen" mockups for the Features page.
 * Hand-built with SVG/CSS (no chart library, no screenshots) using the same
 * design tokens as the rest of the site — teal primary, ink/ink-soft text,
 * grey-100/200 borders, shadow-card. Inspired by the panel-style visuals on
 * resend.com/features (run logs, status pills, workflow diagrams) adapted
 * to our light theme.
 */
import { Check } from "./ui/Icon";

/** Financial Management — collection rate trending up, bar chart. */
export function FinancialChart() {
  const bars = [38, 46, 52, 61, 71, 84];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">On-time collections</p>
          <p className="mt-1 text-3xl font-semibold text-ink">96.5%</p>
        </div>
        <span className="rounded-full bg-success-light px-2.5 py-1 text-xs font-semibold text-success">
          +40% MoM
        </span>
      </div>
      <div className="mt-6 flex h-28 items-end gap-2.5">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`w-full rounded-t-md transition-all ${
                i === bars.length - 1 ? "bg-primary" : "bg-primary-light"
              }`}
              style={{ height: `${h}%` }}
            />
            <span className="text-[10px] text-ink-muted">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Service Management — live-looking maintenance ticket run log with status pills. */
export function ServiceLog() {
  const rows: { title: string; status: string; tone: "success" | "primary" | "muted"; time: string }[] = [
    { title: "Leaking kitchen faucet", status: "Resolved", tone: "success", time: "2h ago" },
    { title: "AC unit — Building B", status: "In Progress", tone: "primary", time: "35m ago" },
    { title: "Elevator inspection", status: "Scheduled", tone: "muted", time: "Today, 4 PM" },
  ];
  const toneClasses: Record<string, string> = {
    success: "bg-success-light text-success",
    primary: "bg-primary-lighter text-primary",
    muted: "bg-grey-100 text-ink-muted",
  };
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-3 rounded-xl border border-grey-100 px-4 py-3"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{r.title}</p>
            <p className="text-xs text-ink-muted" dir="ltr">{r.time}</p>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[r.tone]}`}>
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Property Management — portfolio occupancy donut + unit breakdown. */
export function PropertyDonut() {
  const occupied = 94;
  const circumference = 2 * Math.PI * 45;
  const dash = (occupied / 100) * circumference;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 120 120" className="h-28 w-28 shrink-0 -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r="45" fill="none" stroke="#F0F0F0" strokeWidth="12" />
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="#008EA5"
          strokeWidth="12"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
        />
      </svg>
      <div>
        <p className="text-3xl font-semibold text-ink">{occupied}%</p>
        <p className="text-sm text-ink-soft">Portfolio occupancy</p>
        <p className="mt-3 text-xs text-ink-muted" dir="ltr">
          1,240 units · 1,166 occupied · 74 vacant
        </p>
      </div>
    </div>
  );
}

/** AI & Automation — screening pipeline with an accuracy meter. */
export function AIPipeline() {
  const steps = ["Application", "AI Screening", "Decision"];
  return (
    <div>
      <div className="flex items-center justify-between gap-1">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="w-full rounded-xl border border-grey-200 bg-grey-50 px-2 py-3 text-center">
              <p className="text-[11px] font-medium text-ink">{s}</p>
            </div>
            {i < steps.length - 1 && (
              <svg width="20" height="10" viewBox="0 0 20 10" className="mx-1 shrink-0 text-grey-600" aria-hidden="true">
                <path d="M0 5H16M16 5L11 1M16 5L11 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>Screening accuracy</span>
          <span className="font-semibold text-primary">99.2%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-grey-100">
          <div className="h-full rounded-full bg-primary" style={{ width: "99.2%" }} />
        </div>
      </div>
    </div>
  );
}

/** Compliance — audit trail log with green checks and timestamps. */
export function ComplianceLog() {
  const rows = [
    { action: "VAT invoice generated", time: "09:42 AM" },
    { action: "RERA contract logged", time: "09:41 AM" },
    { action: "Payment reconciled", time: "09:38 AM" },
  ];
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl border border-grey-100 px-4 py-3">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success-light text-success">
            <Check size={13} />
          </span>
          <p className="flex-1 truncate text-sm text-ink">{r.action}</p>
          <p className="shrink-0 text-xs text-ink-muted" dir="ltr">{r.time}</p>
        </div>
      ))}
    </div>
  );
}

/** Integrations — hub-and-spoke connector diagram. */
export function IntegrationsHub() {
  const nodes = [
    { label: "Payments", x: 0, y: -92 },
    { label: "Banking", x: 92, y: 0 },
    { label: "Accounting", x: 0, y: 92 },
    { label: "CRM", x: -92, y: 0 },
  ];
  return (
    <div className="relative mx-auto h-56 w-full max-w-[280px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="-140 -140 280 280" aria-hidden="true">
        {nodes.map((n) => (
          <line key={n.label} x1="0" y1="0" x2={n.x} y2={n.y} stroke="#E3E3E3" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-primary text-white shadow-lift">
        <span className="text-xs font-bold">ATAR</span>
      </div>
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center whitespace-nowrap rounded-xl border border-grey-200 bg-white px-3 py-2 text-xs font-medium text-ink shadow-card"
          style={{ left: `calc(50% + ${n.x}px)`, top: `calc(50% + ${n.y}px)` }}
        >
          {n.label}
        </div>
      ))}
    </div>
  );
}
