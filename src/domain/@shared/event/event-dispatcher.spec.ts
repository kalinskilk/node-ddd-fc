import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import ConsoleLogWhenCustomerAddressIsChangedHandler from "../../customer/event/handler/console-log-when-customer-address-is-changed.handler";
import LogCustomerCreatedToConsole2Handler from "../../customer/event/handler/log-customer-created-to-console-2.handler";
import LogCustomerCreatedToConsoleHandler from "../../customer/event/handler/log-customer-created-to-console.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should notify when customer is created", () => {
    const eventDispatcher = new EventDispatcher();

    const firstEventHandler = new LogCustomerCreatedToConsoleHandler();
    const seccondEventHandler = new LogCustomerCreatedToConsole2Handler();

    const spyFirstHandler = jest.spyOn(firstEventHandler, "handle");
    const spySeccondHandler = jest.spyOn(seccondEventHandler, "handle");

    const eventName = "CustomerCreatedEvent";

    eventDispatcher.register(eventName, firstEventHandler);
    eventDispatcher.register(eventName, seccondEventHandler);

    const event = new CustomerCreatedEvent({
      id: "1",
      name: "Customer",
      active: true,
    });

    eventDispatcher.notify(event);

    expect(spyFirstHandler).toHaveBeenCalled();
    expect(spySeccondHandler).toHaveBeenCalled();
  });

  it("should notify when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new ConsoleLogWhenCustomerAddressIsChangedHandler();

    const eventName = "CustomerAddressChangedEvent";

    const spyHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register(eventName, eventHandler);

    const event = new CustomerAddressChangedEvent({
      id: "1",
      nome: "Customer",
      endereco: "Street 1, City 1, ZipCode 1",
    });

    eventDispatcher.notify(event);

    expect(spyHandler).toHaveBeenCalled();
  });
});
