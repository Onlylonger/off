export function compareMonthDay(dateStr1: string, dateStr2: string) {
  const parseMonthDay = (dateStr: string) => {
    const [month, day] = dateStr.split(".").map(Number);
    return { month, day };
  };

  const { month: month1, day: day1 } = parseMonthDay(dateStr1);
  const { month: month2, day: day2 } = parseMonthDay(dateStr2);

  if (month1 !== month2) {
    return month1 - month2;
  }

  return day1 - day2;
}

export const getUrl = (path: string) => {
  return `${import.meta.env.BASE_URL}${path}`;
};

export const copyToClipboard = async (text: string, isRichText = false) => {
  try {
    if (isRichText) {
      const blob = new Blob([text], { type: "text/html" });
      const data = [
        new ClipboardItem({
          "text/html": blob,
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ];

      await navigator.clipboard.write(data);
    } else {
      await navigator.clipboard.writeText(text);
    }

    return true;
  } catch (err) {
    console.error("复制失败:", err);

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch (err) {
      document.body.removeChild(textarea);
      return false;
    }
  }
};

export const capitalizeFirstLetter = (str: string) => {
  return str.replace(
    /^(\s*)([a-z])/,
    (_, spaces, letter) => spaces + letter.toUpperCase(),
  );
};
