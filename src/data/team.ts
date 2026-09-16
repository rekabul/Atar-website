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
};

export const teamMembers: TeamMember[] = [
  {
    name: "Bassam AlBassam",
    title: { en: "Chairman of the Board", ar: "رئيس مجلس الإدارة" },
    photo: teamAsset("bassam-albassam.jpg"),
  },
  {
    name: "Haseeb Shaikh",
    title: { en: "Founder, Managing Director", ar: "المؤسس والمدير الإداري" },
    photo: teamAsset("haseeb-shaikh.jpg"),
  },
  {
    name: "Ahmed Mirghani",
    title: { en: "Board Member", ar: "عضو مجلس الإدارة" },
    photo: teamAsset("ahmed-mirghani.jpg"),
  },
  {
    name: "Ghassan Dardas",
    title: { en: "Chief Commercial Officer", ar: "الرئيس التجاري" },
    photo: teamAsset("ghassan-dardas.jpg"),
  },
  {
    name: "Ahmed Sharaf",
    title: { en: "Chief Technology Officer", ar: "الرئيس التقني" },
    photo: teamAsset("ahmed-sharaf.jpg"),
  },
];
