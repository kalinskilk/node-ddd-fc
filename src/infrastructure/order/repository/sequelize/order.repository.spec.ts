import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";

import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";

import ProductModel from "../../../product/repository/sequelize/product.model";

import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      CustomerModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 2", 2, "123", "City");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: "1",
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 2", 2, "123", "City");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Rua 3", 3, "1235", "City");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.changeCustomerId(customer2.id);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: "1",
      customer_id: customer2.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    });
  });

  it("should throw an error when a order is not found", async () => {
    const order = new OrderRepository();

    expect(async () => await order.find("123")).rejects.toThrow(
      "Order not found"
    );
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 2", 2, "123", "City");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);
    expect(foundOrder).toStrictEqual(order);
  });

  it("should findall orders", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    /* ORDER 1  */
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 2", 2, "123", "City");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id
    );

    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    /* order 2 */
    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Rua 3", 3, "1235", "City");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      2,
      product.id
    );

    const order2 = new Order("2", customer2.id, [orderItem2]);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();
    expect(orders).toStrictEqual([order, order2]);
  });
});
