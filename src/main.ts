import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

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
