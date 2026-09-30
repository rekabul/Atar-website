import { teamAsset } from "../assets";
import { type LStr } from "./pricing";

/**
 * Leadership roster — reconstructed from the Company Profile PDF's
 * "Leadership & Governance" page (p.24) using word-position extraction (the
 * plain text stream interleaves the two column groups, e.g. "Mirghani Haseeb
 * Shaikh" reads as one name at a glance but is actually two people's names
 * side by side). Photos are the real headshots embedded on that page.
 *
 * Haseeb Shaikh is listed on the PDF twice — once under Board of Directors,
 * once under Executive Team (same photo/xref both times) — so he appears
 * once here with his primary (Executive) title.
 */
export type TeamMember = {
  name: string;
  title: LStr;
  photo: string;
  /** Company/company/leadership page groupings — a person can be both. */
  board?: boolean;
  executive?: boolean;
  founder?: boolean;
  /** Short, role-derived focus tags for the Leadership page's exec cards and
   *  profile drawer — inferred directly from each person's real title, not
   *  invented biographical detail. */
  focus?: LStr[];
  /** Real LinkedIn profile URL. None on file yet for anyone — the Leadership
   *  page shows a muted "profile coming soon" note instead of a link that
   *  goes nowhere (a "#" href) when this is unset. */
  linkedin?: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Bassam AlBassam",
    title: { en: "Chairman of the Board", ar: "رئيس مجلس الإدارة" },
    photo: teamAsset("bassam-albassam.jpg"),
    board: true,
    focus: [{ en: "Governance", ar: "الحوكمة" }],
  },
  {
    name: "Haseeb Shaikh",
    title: { en: "Founder, Managing Director", ar: "المؤسس والمدير الإداري" },
    photo: teamAsset("haseeb-shaikh.jpg"),
    board: true,
    executive: true,
    founder: true,
    focus: [
      { en: "Strategy", ar: "الاستراتيجية" },
      { en: "Real Estate Technology", ar: "تقنية العقارات" },
      { en: "Product", ar: "المنتج" },
    ],
  },
  {
    name: "Ahmed Mirghani",
    title: { en: "Board Member", ar: "عضو مجلس الإدارة" },
    photo: teamAsset("ahmed-mirghani.jpg"),
    board: true,
    focus: [{ en: "Governance", ar: "الحوكمة" }],
  },
  {
    name: "Ghassan Dardas",
    title: { en: "Chief Commercial Officer", ar: "الرئيس التجاري" },
    photo: teamAsset("ghassan-dardas.jpg"),
    executive: true,
    focus: [
      { en: "Commercial", ar: "الأعمال التجارية" },
      { en: "Partnerships", ar: "الشراكات" },
    ],
  },
  {
    name: "Ahmed Sharaf",
    title: { en: "Chief Technology Officer", ar: "الرئيس التقني" },
    photo: teamAsset("ahmed-sharaf.jpg"),
    executive: true,
    focus: [
      { en: "Technology", ar: "التقنية" },
      { en: "Product", ar: "المنتج" },
    ],
  },
];
