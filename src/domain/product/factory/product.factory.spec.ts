import ProductFactory from "./product.factory";

describe("Product factory tests", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.create("a", "Product 1", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type a", () => {
    const product = ProductFactory.create("b", "Product B", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(200);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw error when type is not supported", () => {
    expect(() => ProductFactory.create("c", "Product 1", 100)).toThrowError(
      "Product type not supported"
    );
  });
});
