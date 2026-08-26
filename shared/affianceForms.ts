export type LeadKind = "contact" | "newsletter" | "project" | "quote" | "customization";

const requiredFields: Record<LeadKind, string[]> = {
  contact: ["name", "phone", "email", "type", "message"],
  newsletter: ["newsletter-email"],
  project: ["project-name", "project-space", "project-message"],
  quote: ["quote-name", "quote-contact", "quote-interest"],
  customization: ["custom-name", "custom-phone", "custom-email", "custom-color", "custom-fabric", "custom-material", "custom-finish", "custom-dimensions"],
};

const emailFields = new Set(["email", "newsletter-email", "custom-email"]);

export function validateLeadData(kind: LeadKind, values: Record<string, string>) {
  const missing = requiredFields[kind].find((field) => !values[field]?.trim());
  if (missing) {
    return { valid: false, message: "Preencha todos os campos obrigatórios para continuar." } as const;
  }

  const invalidEmail = requiredFields[kind].find((field) => emailFields.has(field) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[field]));
  if (invalidEmail) {
    return { valid: false, message: "Indique um e-mail válido para que possamos responder." } as const;
  }

  return { valid: true, message: "Dados válidos." } as const;
}
