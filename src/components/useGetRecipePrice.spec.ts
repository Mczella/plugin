import { testMe } from "./useGetRecipePrice";

describe("useGetRecipePrice", () => {
  it("vrati cenu receptu", () => {
    expect(testMe(1)).toBe(2);
    expect(testMe(2)).toBe(2);
  });
});
