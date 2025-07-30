import OrderFactory, { OrderFactoryProps } from "./order.factory";

import { randomUUID } from "crypto";

describe("Order factory unit tests", () => {
  it("should create an order", () => {
    const orderProps: OrderFactoryProps = {
      id: randomUUID(),
      customerId: randomUUID(),
      items: [
        {
          id: randomUUID(),
          name: "Product 1",
          price: 100,
          quantity: 1,
          productId: randomUUID(),
        },
      ],
    };
    const order = OrderFactory.create(orderProps);

    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
