import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";

const customer = new Customer("123", "Wesley");
const address = new Address("Rua 2", 2, "123", "City");

customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, 1, "p1");
const item2 = new OrderItem("2", "Item 2", 15, 1, "p2");
const order = new Order("1", "123", [item1, item2]);

// modelando ordem e items

/**
 * Customer => Address
 * Order => Orderitem
 * Product
 */
