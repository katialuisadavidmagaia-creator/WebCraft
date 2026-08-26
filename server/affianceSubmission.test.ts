import { describe, expect, it } from "vitest";
import { processLeadSubmission } from "../shared/affianceSubmission";

describe("submissão dos pedidos AFFIANCE", () => {
  it("rejeita um orçamento incompleto antes de fechar o modal", () => {
    expect(processLeadSubmission("quote", { "quote-name": "Carla", "quote-contact": "841234567", "quote-interest": "" })).toMatchObject({ accepted: false, shouldReset: false, shouldCloseModal: false });
  });

  it("aceita um orçamento completo e solicita a limpeza e o fecho do modal", () => {
    expect(processLeadSubmission("quote", { "quote-name": "Carla", "quote-contact": "841234567", "quote-interest": "Mobiliário" })).toMatchObject({ accepted: true, shouldReset: true, shouldCloseModal: true });
  });

  it("aceita um projeto completo e solicita a limpeza e o fecho do modal", () => {
    expect(processLeadSubmission("project", { "project-name": "Carla", "project-space": "Sala de estar", "project-message": "Quero um ambiente mais acolhedor." })).toMatchObject({ accepted: true, shouldReset: true, shouldCloseModal: true });
  });

  it("rejeita um projeto com campos obrigatórios em falta", () => {
    expect(processLeadSubmission("project", { "project-name": "Carla", "project-space": "", "project-message": "Quero um ambiente mais acolhedor." })).toMatchObject({ accepted: false, shouldReset: false, shouldCloseModal: false });
  });

  it("aceita a newsletter sem solicitar o fecho de um modal", () => {
    expect(processLeadSubmission("newsletter", { "newsletter-email": "carla@exemplo.com" })).toMatchObject({ accepted: true, shouldReset: true, shouldCloseModal: false });
  });

  it("aceita uma personalização completa e fecha o modal ao concluir", () => {
    expect(processLeadSubmission("customization", {
      "custom-name": "Carla", "custom-phone": "841234567", "custom-email": "carla@exemplo.com", "custom-color": "Oliva", "custom-fabric": "Linho", "custom-material": "Madeira", "custom-finish": "Bronze", "custom-dimensions": "240 cm",
    })).toMatchObject({ accepted: true, shouldReset: true, shouldCloseModal: true });
  });

  it("mantém o contacto na página enquanto confirma a submissão", () => {
    expect(processLeadSubmission("contact", { name: "Carla", phone: "841234567", email: "carla@exemplo.com", type: "Consultoria", message: "Gostaria de agendar uma conversa." })).toMatchObject({ accepted: true, shouldReset: true, shouldCloseModal: false });
  });
});
