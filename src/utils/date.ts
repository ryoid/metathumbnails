export const initalDate = (): Date => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 4);
  return now;
};

export const dateToLocaleISOString = (date: Date) =>
  (date.toISOString().split(".")[0] as string).slice(0, -3);
