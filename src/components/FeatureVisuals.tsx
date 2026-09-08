/**
 * Small, self-contained "product screen" mockups for the Features page.
 * Built on shadcn/ui primitives (Card, Badge, Chart/Recharts) restyled to
 * the Atar design system — teal primary, ink/ink-soft text, grey-100/200
 * borders, shadow-card — with dark-mode variants for every element. The two
 * data-driven visuals (collection trend, portfolio occupancy) render as real
 * Recharts charts via shadcn's Chart wrapper; the rest are status lists and
 * diagrams, composed from Card + Badge rather than a chart type that doesn't
 * fit the content.
 *
 * `FinancialChart` and `PropertyDonut` below are the originals used on the
 * (unmodified) Features page. `CollectionsAreaChart` further down is a
 * separate, modern gradient-area take on the same collection-rate data, used
 * only by the Products > Leasing Suite page — kept as its own component so
 * updating it never touches what renders on Features.
 */
import { useId } from "react";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, Area, AreaChart } from "recharts";
import { Check, Riyal } from "./ui/Icon";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./ui/chart";

/** Financial Management — collection rate trending up, real bar chart. */
const financialData = [
  { month: "Jan", rate: 38 },
  { month: "Feb", rate: 46 },
  { month: "Mar", rate: 52 },
  { month: "Apr", rate: 61 },
  { month: "May", rate: 71 },
  { month: "Jun", rate: 84 },
];

const financialConfig = {
  rate: { label: "Collection rate", color: "#008EA5" },
} satisfies ChartConfig;

export function FinancialChart() {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-3 pt-6 sm:pt-7">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted dark:text-white/50">On-time collections</p>
          <p className="mt-1 text-3xl font-semibold text-ink dark:text-white">96.5%</p>
        </div>
        <Badge variant="success">+40% MoM</Badge>
      </CardHeader>
      <CardContent className="pb-6 sm:pb-7">
        <ChartContainer config={financialConfig} className="mt-4 aspect-auto h-32 w-full">
          <BarChart data={financialData} margin={{ left: 0, right: 0, top: 4 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="rate" fill="var(--color-rate)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

/** Modern gradient-area take on the same collection-rate data, for Products > Leasing Suite only. */
export function CollectionsAreaChart() {
  const gradientId = `financial-rate-${useId().replace(/:/g, "")}`;
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-3 pt-6 sm:pt-7">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted dark:text-white/50">On-time collections</p>
          <p className="mt-1 text-3xl font-semibold text-ink dark:text-white">96.5%</p>
        </div>
        <Badge variant="success">+40% MoM</Badge>
      </CardHeader>
      <CardContent className="pb-6 sm:pb-7">
        <ChartContainer config={financialConfig} className="mt-4 aspect-auto h-32 w-full">
          <AreaChart data={financialData} margin={{ left: 0, right: 0, top: 4 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-rate)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-rate)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="var(--color-rate)"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

/** Service Management — live-looking maintenance ticket run log with status pills. */
export function ServiceLog() {
  const rows: { title: string; status: string; tone: "success" | "default" | "secondary"; time: string }[] = [
    { title: "Leaking kitchen faucet", status: "Resolved", tone: "success", time: "2h ago" },
    { title: "AC unit, Building B", status: "In Progress", tone: "default", time: "35m ago" },
    { title: "Elevator inspection", status: "Scheduled", tone: "secondary", time: "Today, 4 PM" },
  ];
  return (
    <Card className="space-y-3 p-6 sm:p-7">
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-3 rounded-xl border border-grey-100 px-4 py-3 dark:border-white/10"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink dark:text-white">{r.title}</p>
            <p className="text-xs text-ink-muted dark:text-white/40" dir="ltr">{r.time}</p>
          </div>
          <Badge variant={r.tone} className="shrink-0">
            {r.status}
          </Badge>
        </div>
      ))}
    </Card>
  );
}

/** Property Management — portfolio occupancy donut, real Recharts pie chart. */
const occupancyData = [
  { segment: "occupied", value: 94, fill: "#008EA5" },
  { segment: "vacant", value: 6, fill: "#E3E3E3" },
];

const occupancyConfig = {
  occupied: { label: "Occupied", color: "#008EA5" },
  vacant: { label: "Vacant", color: "#E3E3E3" },
} satisfies ChartConfig;

export function PropertyDonut() {
  return (
    <Card className="flex-row items-center gap-6 p-6 sm:p-7">
      <ChartContainer config={occupancyConfig} className="aspect-square h-28 w-28 shrink-0">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie data={occupancyData} dataKey="value" nameKey="segment" innerRadius={38} outerRadius={54} strokeWidth={0} />
        </PieChart>
      </ChartContainer>
      <div>
        <p className="text-3xl font-semibold text-ink dark:text-white">94%</p>
        <p className="text-sm text-ink-soft dark:text-white/70">Portfolio occupancy</p>
        <p className="mt-3 text-xs text-ink-muted dark:text-white/40" dir="ltr">
          1,240 units · 1,166 occupied · 74 vacant
        </p>
      </div>
    </Card>
  );
}

/** AI & Automation — screening pipeline with an accuracy meter. */
export function AIPipeline() {
  const steps = ["Application", "AI Screening", "Decision"];
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex items-center justify-between gap-1">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="w-full rounded-xl border border-grey-200 bg-grey-50 px-2 py-3 text-center dark:border-white/10 dark:bg-white/5">
              <p className="text-[11px] font-medium text-ink dark:text-white">{s}</p>
            </div>
            {i < steps.length - 1 && (
              <svg width="20" height="10" viewBox="0 0 20 10" className="mx-1 shrink-0 text-grey-600 dark:text-white/30" aria-hidden="true">
                <path d="M0 5H16M16 5L11 1M16 5L11 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between text-xs text-ink-muted dark:text-white/50">
          <span>Screening accuracy</span>
          <Badge>~99%</Badge>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-grey-100 dark:bg-white/10">
          <div className="h-full rounded-full bg-primary" style={{ width: "99%" }} />
        </div>
      </div>
    </Card>
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
    <Card className="space-y-3 p-6 sm:p-7">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl border border-grey-100 px-4 py-3 dark:border-white/10">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success-light text-success dark:bg-success/15">
            <Check size={13} />
          </span>
          <p className="flex-1 truncate text-sm text-ink dark:text-white">{r.action}</p>
          <p className="shrink-0 text-xs text-ink-muted dark:text-white/40" dir="ltr">{r.time}</p>
        </div>
      ))}
    </Card>
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
    <Card className="items-center p-6 sm:p-7">
      <div className="relative mx-auto h-56 w-full max-w-[280px]">
        <svg
          className="absolute inset-0 h-full w-full text-grey-200 dark:text-white/15"
          viewBox="-140 -140 280 280"
          aria-hidden="true"
        >
          {nodes.map((n) => (
            <line key={n.label} x1="0" y1="0" x2={n.x} y2={n.y} stroke="currentColor" strokeWidth="1.5" />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-primary text-white shadow-lift">
          <span className="text-xs font-bold">Atar</span>
        </div>
        {nodes.map((n) => (
          <div
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `calc(50% + ${n.x}px)`, top: `calc(50% + ${n.y}px)` }}
          >
            <Badge variant="outline" className="whitespace-nowrap bg-white dark:bg-white/10">
              {n.label}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

/**
 * Products > Sales Suite "How it works" — one distinct mockup per step,
 * matching the actual action described (listing, lead interest, booking
 * payment, e-signature, milestone billing) rather than one shared visual
 * reused across the whole flow.
 */

/** Step 1 — List properties for sale. */
export function ListingCard() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-secondary to-primary sm:h-28">
        <Badge variant="outline" className="absolute start-3 top-3 border-white/25 bg-white/10 text-white backdrop-blur-sm">
          Off-plan
        </Badge>
      </div>
      <div className="space-y-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-ink dark:text-white">Block A · Unit 214</p>
            <p className="text-xs text-ink-muted dark:text-white/40">La Vie Residences, Riyadh</p>
          </div>
          <Badge variant="success">Listed</Badge>
        </div>
        <div className="flex items-center justify-between border-t border-grey-100 pt-3 dark:border-white/10">
          <span className="flex items-center gap-1 text-lg font-semibold text-ink dark:text-white" dir="ltr">
            <Riyal className="h-4 w-auto" />
            860,000
          </span>
          <span className="text-xs text-ink-muted dark:text-white/40">3 new listings today</span>
        </div>
      </div>
    </Card>
  );
}

/** Step 2 — Attract buyers; interest and leads trending up. */
const leadsData = [
  { day: "Mon", leads: 4 },
  { day: "Tue", leads: 7 },
  { day: "Wed", leads: 6 },
  { day: "Thu", leads: 11 },
  { day: "Fri", leads: 15 },
  { day: "Sat", leads: 21 },
];

const leadsConfig = {
  leads: { label: "New leads", color: "#008EA5" },
} satisfies ChartConfig;

export function LeadsChart() {
  const gradientId = `leads-${useId().replace(/:/g, "")}`;
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-3 pt-6 sm:pt-7">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted dark:text-white/50">Interest this week</p>
          <p className="mt-1 text-3xl font-semibold text-ink dark:text-white">64 leads</p>
        </div>
        <Badge variant="success">+250%</Badge>
      </CardHeader>
      <CardContent className="pb-6 sm:pb-7">
        <ChartContainer config={leadsConfig} className="mt-4 aspect-auto h-32 w-full">
          <AreaChart data={leadsData} margin={{ left: 0, right: 0, top: 4 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-leads)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-leads)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="var(--color-leads)"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

/** Step 3 — Secure bookings; a SADAD booking-payment confirmation. */
export function BookingConfirm() {
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-success-light text-success dark:bg-success/15">
          <Check size={18} />
        </span>
        <Badge variant="success">Booking secured</Badge>
      </div>
      <p className="mt-4 text-sm text-ink-muted dark:text-white/50">Booking payment received via</p>
      <p className="text-lg font-semibold text-ink dark:text-white">SADAD · Ref #48213</p>
      <div className="mt-4 flex items-center justify-between border-t border-grey-100 pt-4 dark:border-white/10">
        <span className="flex items-center gap-1 text-xl font-semibold text-primary" dir="ltr">
          <Riyal className="h-4 w-auto" />
          25,000
        </span>
        <span className="text-xs text-ink-muted dark:text-white/40">Unit 214, Block A</span>
      </div>
    </Card>
  );
}

/** Step 4 — Sign contracts; Nafath e-signature log for both parties. */
export function SignatureCheck() {
  const rows = [
    { who: "Buyer", status: "Signed via Nafath", time: "09:41 AM" },
    { who: "Seller", status: "Signed via Nafath", time: "09:44 AM" },
  ];
  return (
    <Card className="space-y-3 p-6 sm:p-7">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl border border-grey-100 px-4 py-3 dark:border-white/10">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-success-light text-success dark:bg-success/15">
            <Check size={15} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-ink dark:text-white">{r.who}</p>
            <p className="text-xs text-ink-muted dark:text-white/40">{r.status}</p>
          </div>
          <p className="shrink-0 text-xs text-ink-muted dark:text-white/40" dir="ltr">
            {r.time}
          </p>
        </div>
      ))}
      <div className="rounded-xl bg-primary-lighter px-4 py-3 text-center text-xs font-medium text-primary dark:bg-white/10 dark:text-primary-light">
        Contract fully executed
      </div>
    </Card>
  );
}

/**
 * Products > Leasing Suite "How it works" — one distinct mockup per step,
 * matching the actual action described (rental listing, renter interest,
 * application review, quotation, lease + invoicing).
 */

/** Step 1 — List available rentals. */
export function RentalListingCard() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-secondary to-primary sm:h-28">
        <Badge variant="outline" className="absolute start-3 top-3 border-white/25 bg-white/10 text-white backdrop-blur-sm">
          For Rent
        </Badge>
      </div>
      <div className="space-y-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-ink dark:text-white">Tower C · Apt 512</p>
            <p className="text-xs text-ink-muted dark:text-white/40">Al Narjis, Riyadh</p>
          </div>
          <Badge variant="success">Available</Badge>
        </div>
        <div className="flex items-center justify-between border-t border-grey-100 pt-3 dark:border-white/10">
          <span className="flex items-center gap-1 text-lg font-semibold text-ink dark:text-white" dir="ltr">
            <Riyal className="h-4 w-auto" />
            65,000<span className="text-xs font-normal text-ink-muted dark:text-white/40">/yr</span>
          </span>
          <span className="text-xs text-ink-muted dark:text-white/40">4 new listings today</span>
        </div>
      </div>
    </Card>
  );
}

/** Step 2 — Attract renters; inquiries trending up. */
const renterInterestData = [
  { day: "Mon", inquiries: 5 },
  { day: "Tue", inquiries: 8 },
  { day: "Wed", inquiries: 9 },
  { day: "Thu", inquiries: 14 },
  { day: "Fri", inquiries: 18 },
  { day: "Sat", inquiries: 24 },
];

const renterInterestConfig = {
  inquiries: { label: "Renter inquiries", color: "#008EA5" },
} satisfies ChartConfig;

export function RenterInterestChart() {
  const gradientId = `renter-interest-${useId().replace(/:/g, "")}`;
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-3 pt-6 sm:pt-7">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted dark:text-white/50">Interest this week</p>
          <p className="mt-1 text-3xl font-semibold text-ink dark:text-white">78 inquiries</p>
        </div>
        <Badge variant="success">+210%</Badge>
      </CardHeader>
      <CardContent className="pb-6 sm:pb-7">
        <ChartContainer config={renterInterestConfig} className="mt-4 aspect-auto h-32 w-full">
          <AreaChart data={renterInterestData} margin={{ left: 0, right: 0, top: 4 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-inquiries)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-inquiries)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Area
              type="monotone"
              dataKey="inquiries"
              stroke="var(--color-inquiries)"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

/** Step 3 — Receive applications; KYC and full detail review. */
export function ApplicationReviewCard() {
  const rows: { title: string; status: string; tone: "success" | "default" | "secondary" }[] = [
    { title: "Identity verified (Absher)", status: "Passed", tone: "success" },
    { title: "Income & employment check", status: "Passed", tone: "success" },
    { title: "Application decision", status: "Approved", tone: "success" },
  ];
  return (
    <Card className="space-y-3 p-6 sm:p-7">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl border border-grey-100 px-4 py-3 dark:border-white/10">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-success-light text-success dark:bg-success/15">
            <Check size={15} />
          </span>
          <p className="flex-1 truncate text-sm text-ink dark:text-white">{r.title}</p>
          <Badge variant={r.tone} className="shrink-0">
            {r.status}
          </Badge>
        </div>
      ))}
    </Card>
  );
}

/** Step 4 — Issue quotations, linked to the lead and application. */
export function QuotationCard() {
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-muted dark:text-white/50">Quotation #Q-1042</p>
        <Badge variant="secondary">Sent to renter</Badge>
      </div>
      <div className="mt-4 flex items-end justify-between border-b border-grey-100 pb-4 dark:border-white/10">
        <div>
          <p className="text-xs text-ink-muted dark:text-white/40">Annual rental</p>
          <span className="flex items-center gap-1 text-2xl font-semibold text-ink dark:text-white" dir="ltr">
            <Riyal className="h-4 w-auto" />
            65,000
          </span>
        </div>
        <p className="text-xs text-ink-muted dark:text-white/40">Valid 5 days</p>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-ink-soft dark:text-white/70">Linked application</span>
        <span className="font-medium text-ink dark:text-white" dir="ltr">
          #APP-3391
        </span>
      </div>
    </Card>
  );
}

/** Step 5 — Create & manage leases; agreement generated with auto-invoicing. */
export function LeaseAgreementCard() {
  const rows = [
    { label: "Q1 invoice", status: "Paid" },
    { label: "Q2 invoice", status: "Paid" },
    { label: "Q3 invoice", status: "Due Jan 12" },
  ];
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-success-light text-success dark:bg-success/15">
          <Check size={18} />
        </span>
        <Badge variant="success">Lease active</Badge>
      </div>
      <p className="mt-4 text-sm text-ink-muted dark:text-white/50">12-month agreement generated for</p>
      <p className="text-lg font-semibold text-ink dark:text-white">Tower C · Apt 512</p>
      <div className="mt-4 space-y-2 border-t border-grey-100 pt-4 dark:border-white/10">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-xs">
            <span className="text-ink-soft dark:text-white/70">{r.label}</span>
            <span className="font-medium text-ink-muted dark:text-white/40">{r.status}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/** Step 5 — Collect payments & handover; milestone billing progress. */
export function MilestoneBar() {
  const milestones = [
    { label: "Deposit", pct: 20, done: true },
    { label: "Construction", pct: 40, done: true },
    { label: "Handover", pct: 40, done: false },
  ];
  return (
    <Card className="p-6 sm:p-7">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-muted dark:text-white/50">Milestone billing</p>
      <p className="mt-1 text-2xl font-semibold text-ink dark:text-white">60% collected</p>
      <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-grey-100 dark:bg-white/10">
        {milestones.map((m, i) => (
          <div
            key={i}
            className={m.done ? "h-full bg-primary" : "h-full bg-transparent"}
            style={{ width: `${m.pct}%` }}
          />
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {milestones.map((m, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-ink-soft dark:text-white/70">
              <span
                className={
                  m.done
                    ? "grid h-4 w-4 place-items-center rounded-full bg-primary text-white"
                    : "grid h-4 w-4 place-items-center rounded-full border border-grey-200 dark:border-white/20"
                }
              >
                {m.done && <Check size={10} />}
              </span>
              {m.label}
            </span>
            <span className="text-xs text-ink-muted dark:text-white/40">{m.pct}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/**
 * Products > Operations Suite "How it works" — one distinct mockup per step,
 * matching the actual action described (digital handover, resident
 * communication, ticket management, facility upkeep, online payments).
 */

/** Step 1 — Handover & onboard digitally. */
export function HandoverChecklistCard() {
  const rows: { label: string; done: boolean }[] = [
    { label: "Property documentation", done: true },
    { label: "Community guidelines", done: true },
    { label: "Access cards issued", done: true },
    { label: "Welcome orientation", done: false },
  ];
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-muted dark:text-white/50">Digital handover</p>
        <Badge variant="success">3 of 4 complete</Badge>
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center gap-3 rounded-xl border border-grey-100 px-4 py-3 dark:border-white/10"
          >
            <span
              className={
                r.done
                  ? "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success-light text-success dark:bg-success/15"
                  : "grid h-6 w-6 shrink-0 place-items-center rounded-full border border-grey-200 dark:border-white/20"
              }
            >
              {r.done && <Check size={13} />}
            </span>
            <p className="flex-1 text-sm text-ink dark:text-white">{r.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

/** Step 2 — Communicate with customers; news, events and surveys sent. */
export function CommunicationFeedCard() {
  const posts: { title: string; tone: "success" | "default" | "secondary"; time: string }[] = [
    { title: "Pool maintenance this weekend", tone: "default", time: "1h ago" },
    { title: "Community survey — share feedback", tone: "secondary", time: "Today" },
    { title: "Seasonal events schedule", tone: "success", time: "2d ago" },
  ];
  return (
    <Card className="space-y-3 p-6 sm:p-7">
      {posts.map((p, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-3 rounded-xl border border-grey-100 px-4 py-3 dark:border-white/10"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink dark:text-white">{p.title}</p>
            <p className="text-xs text-ink-muted dark:text-white/40" dir="ltr">
              {p.time}
            </p>
          </div>
          <Badge variant={p.tone} className="shrink-0">
            Sent
          </Badge>
        </div>
      ))}
    </Card>
  );
}

/** Step 4 — Manage facilities & common areas; shared-asset upkeep status. */
export function FacilityStatusCard() {
  const rows: { title: string; team: string; status: string; tone: "success" | "default" | "secondary" }[] = [
    { title: "Gym equipment servicing", team: "Facilities team", status: "Assigned", tone: "default" },
    { title: "Fire safety inspection", team: "Compliance team", status: "Completed", tone: "success" },
    { title: "Landscaping — common garden", team: "Vendor: GreenScape", status: "Scheduled", tone: "secondary" },
  ];
  return (
    <Card className="space-y-3 p-6 sm:p-7">
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-3 rounded-xl border border-grey-100 px-4 py-3 dark:border-white/10"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink dark:text-white">{r.title}</p>
            <p className="text-xs text-ink-muted dark:text-white/40">{r.team}</p>
          </div>
          <Badge variant={r.tone} className="shrink-0">
            {r.status}
          </Badge>
        </div>
      ))}
    </Card>
  );
}

/** Step 5 — Collect payments online; gateway confirmation. */
export function OnlinePaymentCard() {
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-success-light text-success dark:bg-success/15">
          <Check size={18} />
        </span>
        <Badge variant="success">Payment received</Badge>
      </div>
      <p className="mt-4 text-sm text-ink-muted dark:text-white/50">Service charge paid online · Ref #77245</p>
      <div className="mt-4 flex items-center justify-between border-t border-grey-100 pt-4 dark:border-white/10">
        <span className="flex items-center gap-1 text-xl font-semibold text-primary" dir="ltr">
          <Riyal className="h-4 w-auto" />
          1,850
        </span>
        <span className="text-xs text-ink-muted dark:text-white/40">Unit 512, Tower C</span>
      </div>
    </Card>
  );
}
