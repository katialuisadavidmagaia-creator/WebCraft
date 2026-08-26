export type LeadKind = "contact" | "newsletter" | "project" | "quote" | "customization";

const requiredFields: Record<LeadKind, string[]> = {
  contact: ["name", "phone", "email", "type", "message"],
  newsletter: ["newsletter-email"],
  project: ["project-name", "project-space", "project-message"],
  quote: ["quote-name", "quote-contact", "quote-interest"],
  customization: ["custom-name", "custom-phone", "custom-email", "custom-color", "custom-fabric", "custom-material", "custom-finish", "custom-dimensions"],
};

export function processLocalSubmission(kind: LeadKind, values: Record<string, string>) {
  const fields = requiredFields[kind];
  if (fields.some((field) => !values[field]?.trim())) {
    return { accepted: false, message: "Preencha todos os campos obrigatórios para continuar.", shouldReset: false, shouldCloseModal: false } as const;
  }
  const emailField = fields.find((field) => ["email", "newsletter-email", "custom-email"].includes(field));
  if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[emailField])) {
    return { accepted: false, message: "Indique um e-mail válido para que possamos responder.", shouldReset: false, shouldCloseModal: false } as const;
  }
  return { accepted: true, message: "Pedido preparado localmente.", shouldReset: true, shouldCloseModal: kind === "quote" || kind === "project" || kind === "customization" } as const;
}

export function addToLocalSelection(items: string[], item: string) {
  return items.includes(item) ? items : [...items, item];
}

export function toggleLocalSelection(items: string[], item: string) {
  return items.includes(item) ? items.filter((current) => current !== item) : [...items, item];
}
