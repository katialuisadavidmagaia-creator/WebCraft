import { describe, expect, it } from "vitest";
import { addUniqueToSelection, toggleSelection } from "../shared/affianceSelection";

describe("seleção de peças AFFIANCE", () => {
  it("permite guardar e remover uma peça dos favoritos", () => {
    expect(toggleSelection([], "rack-elegance")).toEqual(["rack-elegance"]);
    expect(toggleSelection(["rack-elegance"], "rack-elegance")).toEqual([]);
  });

  it("mantém apenas uma referência de cada peça na seleção", () => {
    expect(addUniqueToSelection(["sofa-nova"], "sofa-nova")).toEqual(["sofa-nova"]);
    expect(addUniqueToSelection(["sofa-nova"], "mesa-terra")).toEqual(["sofa-nova", "mesa-terra"]);
  });
});
