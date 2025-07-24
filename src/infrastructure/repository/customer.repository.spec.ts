import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 2", 2, "123", "City");

    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });
    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zip: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 2", 2, "123", "City");

    customer.Address = address;

    await customerRepository.create(customer);

    customer.changeName("Customer 2");

    await customerRepository.update(customer);

    const customerModelUpdated = await CustomerModel.findOne({
      where: { id: "1" },
    });

    expect(customerModelUpdated?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zip: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 2", 2, "123", "City");

    customer.Address = address;

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(foundCustomer);
  });

  it("should throw an error when a customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => await customerRepository.find("123")).rejects.toThrow(
      "Customer not found"
    );
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 2", 2, "123", "City");
    customer.Address = address;
    await customerRepository.create(customer);

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Rua 2", 2, "123", "City");
    customer2.Address = address2;
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
  });
});
