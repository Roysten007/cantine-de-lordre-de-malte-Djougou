export const SITE = {
  name: "Anifath Resto",
  whatsapp: "22900000000", // TODO: remplacer par le vrai numéro
  phone: "+229 00 00 00 00",
  phoneRaw: "+22900000000",
  address: "Enceinte de l'Hôpital — Cotonou, Bénin",
  hours: "Lun – Dim · 06h30 – 22h00",
};

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
