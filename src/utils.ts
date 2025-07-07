import { DATE_DIVIDER } from "./consts";

export function compareMonthDay(dateStr1: string, dateStr2: string) {
  const parseMonthDay = (dateStr: string) => {
    const [month, day] = dateStr.split(DATE_DIVIDER).map(Number);
    return { month, day };
  };

  const { month: month1, day: day1 } = parseMonthDay(dateStr1);
  const { month: month2, day: day2 } = parseMonthDay(dateStr2);

  if (month1 !== month2) {
    return month1 - month2;
  }

  return day1 - day2;
}
