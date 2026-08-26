import { type LeadKind, validateLeadData } from "./affianceForms";

export function processLeadSubmission(kind: LeadKind, values: Record<string, string>) {
  const validation = validateLeadData(kind, values);
  if (!validation.valid) {
    return { accepted: false, message: validation.message, shouldReset: false, shouldCloseModal: false } as const;
  }

  return {
    accepted: true,
    message: "Pedido pronto para envio.",
    shouldReset: true,
    shouldCloseModal: kind === "quote" || kind === "project" || kind === "customization",
  } as const;
}
