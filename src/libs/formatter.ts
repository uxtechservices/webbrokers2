export function formatUSD(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

export function dateFormatter(isoString: string): string {
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = date.getMonth() + 1;
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}
