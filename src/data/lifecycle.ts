import type { ElementType } from "react";
import { Megaphone, Users, Handshake, FileSignature, Key, Wrench, MessageCircle, RefreshCw } from "lucide-react";

export type LStr = { en: string; ar: string };

export const pick = (str: LStr, locale: string) => (locale === "ar" ? str.ar : str.en);

/** Page 6 of the company profile — the 8-stage continuous property lifecycle. */
export const lifecycleStages: { n: string; label: LStr }[] = [
  { n: "01", label: { en: "List & market", ar: "الإدراج والتسويق" } },
  { n: "02", label: { en: "Attract & qualify", ar: "الاستقطاب والتأهيل" } },
  { n: "03", label: { en: "Sell or lease", ar: "البيع أو التأجير" } },
  { n: "04", label: { en: "Contract & collect", ar: "التعاقد والتحصيل" } },
  { n: "05", label: { en: "Handover & onboard", ar: "التسليم والإدراج" } },
  { n: "06", label: { en: "Operate & maintain", ar: "التشغيل والصيانة" } },
  { n: "07", label: { en: "Engage & serve", ar: "التفاعل والخدمة" } },
  { n: "08", label: { en: "Renew & re-market", ar: "التجديد وإعادة التسويق" } },
];

export type SuiteColor = "primary" | "secondary" | "success";

/** [start, end) 1-indexed grid-column ranges into the 8-stage row — same
 * coverage shown on page 6: Sales/Leasing run stages 1-4 then pick back up
 * at stage 8 (re-selling/re-leasing), Operations runs stages 5-8. */
export const suiteCoverage: { name: LStr; color: SuiteColor; segments: [number, number][] }[] = [
  { name: { en: "Sales Suite", ar: "حزمة المبيعات" }, color: "primary", segments: [[1, 5], [8, 9]] },
  { name: { en: "Leasing Suite", ar: "حزمة التأجير" }, color: "secondary", segments: [[1, 5], [8, 9]] },
  { name: { en: "Operations Suite", ar: "حزمة العمليات" }, color: "success", segments: [[5, 9]] },
];

export const suiteBarClasses: Record<SuiteColor, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary dark:bg-white/70",
  success: "bg-success",
};

export const suiteTextClasses: Record<SuiteColor, string> = {
  primary: "text-primary dark:text-primary-light",
  secondary: "text-secondary dark:text-white",
  success: "text-success",
};

/** Page 6's "One source of truth" footer band. */
export const sourceOfTruth: LStr[] = [
  { en: "Properties", ar: "العقارات" },
  { en: "Customers", ar: "العملاء" },
  { en: "Contracts", ar: "العقود" },
  { en: "Financials", ar: "الماليات" },
  { en: "Documents", ar: "المستندات" },
  { en: "Workflows", ar: "سير العمل" },
  { en: "Data", ar: "البيانات" },
];

/** How many first-party modules activate at each of the 8 stages — used to
 * size the "energy"/coverage indicator on the stage-detail variants. Derived
 * from the same per-stage groupings used earlier when the modules were shown
 * inline on the spine (see FeaturesPage history): list&market 4,
 * attract&qualify 4, sell/lease 3, contract&collect 3, handover 2, operate 3,
 * engage 4, renew&re-market 5. */
export const stageModuleCount = [4, 4, 3, 3, 2, 3, 4, 5];

/**
 * Shared per-stage "detail" content — one icon, one short description, one
 * coverage number per stage — used by every variant that shows expandable
 * stage detail (currently Orbital and the interactive linear strip), so
 * switching variants never shows different data for the same stage.
 */
export type StageStatus = "completed" | "in-progress" | "pending";

export type StageDetail = {
  id: number;
  title: string;
  stageNo: string;
  content: string;
  icon: ElementType;
  relatedIds: number[];
  status: StageStatus;
  energy: number;
};

const stageIcons: ElementType[] = [Megaphone, Users, Handshake, FileSignature, Key, Wrench, MessageCircle, RefreshCw];

const stageContent: LStr[] = [
  { en: "Publish listings and launch marketing across every channel.", ar: "انشر الإعلانات وأطلق التسويق عبر كل قناة." },
  { en: "Qualify leads and applicants as they show interest.", ar: "أهّل العملاء المحتملين والمتقدمين فور إبداء الاهتمام." },
  { en: "Close a sale or sign a new lease agreement.", ar: "أتمم عملية بيع أو وقّع عقد إيجار جديد." },
  { en: "Generate contracts and collect payments digitally.", ar: "أنشئ العقود وحصّل المدفوعات إلكترونياً." },
  { en: "Hand over the unit and onboard the new occupant.", ar: "سلّم الوحدة واستقبل الساكن الجديد." },
  { en: "Run day-to-day maintenance and facility operations.", ar: "أدر الصيانة وعمليات المرافق يومياً." },
  { en: "Communicate, engage, and serve residents and tenants.", ar: "تواصل وتفاعل وقدّم الخدمة للسكان والمستأجرين." },
  { en: "Renew, or re-list and re-market for the next cycle.", ar: "جدّد، أو أعد الإدراج والتسويق للدورة التالية." },
];

export function buildStageDetails(locale: string): StageDetail[] {
  return lifecycleStages.map((stage, i) => ({
    id: i + 1,
    title: pick(stage.label, locale),
    stageNo: stage.n,
    content: pick(stageContent[i], locale),
    icon: stageIcons[i],
    // Neighbours on both sides, with the ends wrapping — stage 8 links back
    // to stage 1 so the "continuous cycle" closes visibly when you click it.
    relatedIds: [i === 0 ? lifecycleStages.length : i, i === lifecycleStages.length - 1 ? 1 : i + 2],
    status: "completed",
    energy: 40 + stageModuleCount[i] * 12,
  }));
}

export const stageStatusLabel: Record<StageStatus, LStr> = {
  completed: { en: "LIVE", ar: "مُفعّل" },
  "in-progress": { en: "IN PROGRESS", ar: "قيد التنفيذ" },
  pending: { en: "PENDING", ar: "قيد الانتظار" },
};

export function stageStatusClasses(status: StageStatus): string {
  switch (status) {
    case "completed":
      return "text-success bg-success-light border-success/30 dark:bg-success/15";
    case "in-progress":
      return "text-primary bg-primary-lighter border-primary/30 dark:bg-primary/15 dark:text-primary-light";
    case "pending":
      return "text-ink-muted bg-grey-100 border-grey-200 dark:bg-white/10 dark:text-white/60 dark:border-white/15";
    default:
      return "text-ink-muted bg-grey-100 border-grey-200 dark:bg-white/10 dark:text-white/60 dark:border-white/15";
  }
}
