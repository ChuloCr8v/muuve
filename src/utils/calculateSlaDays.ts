import { differenceInBusinessDays, differenceInDays } from "date-fns";

export function calculateSlaDays(
  assignedDate: Date,
  dueDate: Date,
  isBusinessDays: boolean
) {
  const currentDate = new Date();

  const daysPassed = isBusinessDays
    ? differenceInBusinessDays(currentDate, assignedDate)
    : differenceInDays(currentDate, assignedDate);

  const totalSlaDays = isBusinessDays
    ? differenceInBusinessDays(dueDate, assignedDate)
    : differenceInDays(dueDate, assignedDate);

  return {
    daysPassed,
    totalSlaDays,
    slaText: `${daysPassed}/${totalSlaDays} days`,
  };
}
