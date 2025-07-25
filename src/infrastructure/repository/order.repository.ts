import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
        })),
      },
      {
        where: { id: entity.id },
      }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: ["items"],
        rejectOnEmpty: true,
      });
    } catch (e) {
      throw new Error("Order not found");
    }
    const itens = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.quantity,
          item.product_id
        )
    );
    const order = new Order(orderModel.id, orderModel.customer_id, itens);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const customers = await OrderModel.findAll({ include: ["items"] });
    return customers.map((order) => {
      const itens = order.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.quantity,
            item.product_id
          )
      );
      return new Order(order.id, order.customer_id, itens);
    });
  }
}
