const useTicketSeverityColor = () => {
  const ticketSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "text-[#C42A2A] border-[#C42A2A]";
      case "high":
        return "text-[#F05050] border-[#F05050]";
      case "medium":
        return "text-[#FF7A00] border-[#FF7A00]";
      default:
        return "text-[#E6B300] border-[#E6B300]";
    }
  };
  return { ticketSeverityColor };
};

export default useTicketSeverityColor;
