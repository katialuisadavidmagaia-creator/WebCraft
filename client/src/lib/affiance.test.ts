import { describe, expect, it } from "vitest";

function toggleItem(current: string[], item: string) {
  return current.includes(item) ? current.filter((value) => value !== item) : [...current, item];
}

function addUnique(current: string[], item: string) {
  return current.includes(item) ? current : [...current, item];
}

describe("interações da seleção Affiance", () => {
  it("adiciona e remove produtos dos favoritos", () => {
    expect(toggleItem([], "rack-elegance")).toEqual(["rack-elegance"]);
    expect(toggleItem(["rack-elegance"], "rack-elegance")).toEqual([]);
  });

  it("não duplica peças ao adicionar à seleção", () => {
    expect(addUnique(["sofa-nova"], "sofa-nova")).toEqual(["sofa-nova"]);
    expect(addUnique(["sofa-nova"], "mesa-terra")).toEqual(["sofa-nova", "mesa-terra"]);
  });
});
