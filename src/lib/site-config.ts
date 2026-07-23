export const SITE = {
  name: "La Cantine",
  fullName: "La Cantine de l'Ordre de Malte de Djougou",
  whatsapp: "2290197421809",
  phone: "+229 01 43 54 54 15",
  phoneRaw: "+2290143545415",
  address: "Enceinte de l'Hôpital de l'Ordre de Malte — Djougou, Bénin",
  hours: "Lun – Dim · 07h00 – 22h00",
};

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
