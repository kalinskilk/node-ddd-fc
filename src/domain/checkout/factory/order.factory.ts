import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: [
    {
      id: string;
      name: string;
      price: number;
      quantity: number;
      productId: string;
    }
  ];
}

export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {
    const items = props.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.quantity,
        item.productId
      );
    });
    const order = new Order(props.id, props.customerId, items);
    return order;
  }
}
