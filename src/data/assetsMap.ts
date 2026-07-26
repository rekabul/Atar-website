import { clientAsset, integrationAsset, illustrationWebp } from "../assets";
import saasIcon from "../assets/illustrations/SaaS.svg";
import growthIcon from "../assets/illustrations/hockey stick growth.svg";
import softwareIcon from "../assets/illustrations/Software Companies.svg";
import networkingIcon from "../assets/illustrations/Networking.svg";

/**
 * Maps the REAL exported asset files (cryptic Figma export names) to each
 * section, in display order. `name` is used for accessible alt text.
 */

type ClientLogo = { file: string; name: string; url: string };
type Integration = { file: string; name: string; bg: string; url: string };

export const clientLogos: ClientLogo[] = [
  { file: "Artwork.svg", name: "NAWA Real Estate Development" },
  { file: "Clip path group.svg", name: "Khawalid" },
  { file: "Group 45.svg", name: "Alramz" },
  { file: "Group 48095597.svg", name: "Masheed" },
  { file: "Group 48095603.svg", name: "Client logo" },
  { file: "Group 48095604.svg", name: "Mawreth" },
  { file: "Group 48095606.svg", name: "Rafea Development" },
  { file: "Group 48095633.svg", name: "Garden Residence" },
  { file: "Group 48095636.svg", name: "Client logo" },
  { file: "Group 48095642.svg", name: "Makeen" },
  { file: "Group 48095643.svg", name: "Client logo" },
  { file: "Group.svg", name: "Safa" },
  { file: "Isolation_Mode-1.svg", name: "Kathib Property & Facilities Management" },
  { file: "Isolation_Mode-2.svg", name: "Client logo" },
  { file: "Isolation_Mode.svg", name: "Soun" },
  { file: "Layer_1.svg", name: "Rasf" },
  { file: "Logo.svg", name: "Client logo" },
  { file: "Mask group.svg", name: "Asakin Real Estate Development" },
  { file: "image 6.svg", name: "Solana Living" },
  { file: "logo 3.svg", name: "Mohammed Bin Salman City (Nonprofit)" },
].map((c) => ({ ...c, url: clientAsset(c.file) }));

// Integration order + pastel circle backgrounds match the Figma row.
export const integrations: Integration[] = [
  { file: "Group 48095644.svg", name: "Zapier", bg: "#FBE9EC" },
  { file: "Frame 1707480246.svg", name: "Sadq", bg: "#E6F6EC" },
  { file: "Group 48095601.svg", name: "Power BI", bg: "#FCF4DD" },
  { file: "logo 1.svg", name: "Sakani", bg: "#DDF3F0" },
  { file: "image 72.svg", name: "Edaat", bg: "#E7E9FB" },
  { file: "Frame 1707480351.svg", name: "Nafath", bg: "#DDF3F0" },
].map((i) => ({ ...i, url: integrationAsset(i.file) }));

// One illustration per feature block, in order.
export const featureIllustrations = [
  { file: "Group 48095530.webp", alt: "Financial dashboard with money in and money out" },
  { file: "Services Management.webp", alt: "Service request card marked as assigned" },
  { file: "Units Management.webp", alt: "Property listing for Block A, La Vie community" },
].map((f) => ({ ...f, url: illustrationWebp(f.file) }));

// One icon per benefit card, in order (direct imports so only these ship).
export const benefitIcons = [
  { url: saasIcon },
  { url: growthIcon },
  { url: softwareIcon },
  { url: networkingIcon },
];
