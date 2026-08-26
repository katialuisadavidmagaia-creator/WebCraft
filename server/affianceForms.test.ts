import { describe, expect, it } from "vitest";
import { validateLeadData } from "../shared/affianceForms";

describe("validação dos pedidos AFFIANCE", () => {
  it("impede o envio de um contacto sem os dados obrigatórios", () => {
    expect(validateLeadData("contact", { name: "Carla", phone: "", email: "carla@exemplo.com", type: "Consultoria", message: "Olá" })).toMatchObject({ valid: false });
  });

  it("valida e-mail antes de aceitar a inscrição na newsletter", () => {
    expect(validateLeadData("newsletter", { "newsletter-email": "email-inválido" })).toMatchObject({ valid: false });
    expect(validateLeadData("newsletter", { "newsletter-email": "carla@exemplo.com" })).toMatchObject({ valid: true });
  });

  it("aceita um pedido de personalização completo", () => {
    expect(validateLeadData("customization", {
      "custom-name": "Carla", "custom-phone": "841234567", "custom-email": "carla@exemplo.com", "custom-color": "Oliva", "custom-fabric": "Linho", "custom-material": "Madeira", "custom-finish": "Bronze", "custom-dimensions": "240 cm",
    })).toMatchObject({ valid: true });
  });
});
