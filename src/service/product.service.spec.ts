import Product from "../entity/product";

describe("Product unit tests", () => {
  it("should change the price of all products", () => {
    const p1 = new Product("p1", "Product 1", 10);
    const p2 = new Product("p2", "Product 2", 20);

    const products = [p1, p2];

    ProductService.increasePrice([products], 100);

    expect(p1.price).toBe(20);
    expect(p2.price).toBe(40);
  });
});
