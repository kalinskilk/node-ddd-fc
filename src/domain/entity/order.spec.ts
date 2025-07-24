import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => new Order("123", "", [])).toThrowError(
      "CustomerId is required"
    );
  });

  it("should throw error when items is empty", () => {
    expect(() => new Order("123", "123", [])).toThrowError(
      "Items are required"
    );
  });

  it("should throw error if the qtd is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("1", "Item 1", 100, 0, "p1");
      const order = new Order("o1", "c1", [item]);
    }).toThrowError("Quantity must be greater than zero");
  });
});
