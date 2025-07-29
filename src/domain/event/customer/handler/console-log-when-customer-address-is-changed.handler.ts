import IEventHandler from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class ConsoleLogWhenCustomerAddressIsChangedHandler
  implements IEventHandler<CustomerAddressChangedEvent>
{
  handle(event: any): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`
    );
  }
}
