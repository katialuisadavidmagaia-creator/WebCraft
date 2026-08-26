import { describe, expect, it } from "vitest";
import { addToLocalSelection, processLocalSubmission, toggleLocalSelection } from "./localInteractions";

describe("interações locais do showroom", () => {
  it("mantém a seleção local sem duplicar produtos e permite remover favoritos", () => {
    expect(addToLocalSelection(["rack"], "rack")).toEqual(["rack"]);
    expect(addToLocalSelection(["rack"], "cadeira")).toEqual(["rack", "cadeira"]);
    expect(toggleLocalSelection(["rack", "cadeira"], "rack")).toEqual(["cadeira"]);
  });

  it("valida pedidos no navegador sem persistir dados", () => {
    const rejected = processLocalSubmission("quote", { "quote-name": "", "quote-contact": "86 4662 530", "quote-interest": "Cadeiras" });
    const accepted = processLocalSubmission("quote", { "quote-name": "Rui", "quote-contact": "86 4662 530", "quote-interest": "Cadeiras" });

    expect(rejected.accepted).toBe(false);
    expect(accepted).toMatchObject({ accepted: true, shouldReset: true, shouldCloseModal: true });
  });

  it("rejeita e-mails inválidos e aceita newsletter local válida", () => {
    expect(processLocalSubmission("newsletter", { "newsletter-email": "invalido" }).accepted).toBe(false);
    expect(processLocalSubmission("newsletter", { "newsletter-email": "contacto@affiance.co.mz" }).accepted).toBe(true);
  });
});
