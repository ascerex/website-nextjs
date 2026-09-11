export const inquiryRoutes = [
  {
    value: "general",
    formName: "ascerex-contact",
    number: "01",
    title: "General",
    detail: "Company and program questions",
    email: "contact@ascerex.com",
  },
  {
    value: "investor",
    formName: "ascerex-investors",
    number: "02",
    title: "Investor",
    detail: "Capital strategy and company direction",
    email: "investors@ascerex.com",
  },
  {
    value: "partnership",
    formName: "ascerex-partners",
    number: "03",
    title: "Partnership",
    detail: "Strategic and technical relationships",
    email: "partners@ascerex.com",
  },
  {
    value: "media",
    formName: "ascerex-newsroom",
    number: "04",
    title: "Newsroom",
    detail: "Press and public-information requests",
    email: "newsroom@ascerex.com",
  },
  {
    value: "sales",
    formName: "ascerex-sales",
    number: "05",
    title: "Sales",
    detail: "Commercial and procurement inquiries",
    email: "sales@ascerex.com",
  },
  {
    value: "security",
    formName: "ascerex-security",
    number: "06",
    title: "Security",
    detail: "Responsible security reports",
    email: "security@ascerex.com",
  },
  {
    value: "support",
    formName: "ascerex-support",
    number: "07",
    title: "Support",
    detail: "Website and communication support",
    email: "support@ascerex.com",
  },
] as const;

export type InquiryType = (typeof inquiryRoutes)[number]["value"];

export function getInquiryRoute(value: string) {
  return inquiryRoutes.find((route) => route.value === value) ?? inquiryRoutes[0];
}
