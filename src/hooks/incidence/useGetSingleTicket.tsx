import { useEffect, useState } from "react";
import { ticketsData } from "../../dummy/ticketsData";
import { TicketsDataType } from "../../types";

const useGetSingleTicket = (ticketID?: string) => {
  const [ticket, setTicket] = useState<TicketsDataType>();
  //console.log(ticketID);

  useEffect(() => {
    const currentTicket = ticketsData.find((ticket) => ticket.id === ticketID);
    setTicket(currentTicket);
    //console.log(currentTicket);
  }, [ticketID, ticket, setTicket]);

  return { ticket };
};

export default useGetSingleTicket;
