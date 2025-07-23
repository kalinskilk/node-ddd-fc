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

  it("should calculate total", () => {
    const item = new OrderItem("1", "Item 1", 100, 1);
    const item2 = new OrderItem("2", "Item 2", 200, 1);
    const order = new Order("o1", "c1", [item]);

    expect(order.total()).toBe(100);

    const order2 = new Order("o1", "c1", [item, item2]);

    expect(order2.total()).toBe(300);
  });
});
