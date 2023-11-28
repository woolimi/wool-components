const constructUTC = (year: number, month: number, date: number): Date =>
  new Date(Date.UTC(year, month, date));

const formatDate = (dt: Date, locale: string) =>
  `${dt.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}`;

const getLocalFormat = (locale: string) => {
  return new Date('1234-11-22')
    .toLocaleDateString(locale)
    .replace('1234', 'yyyy')
    .replace('11', 'MM')
    .replace('22', 'dd');
};

const getMonths = (locale: string) => {
  const months = [];
  const dt = new Date(1991, 0, 1);
  for (let i = 0; i < 12; i++) {
    dt.setMonth(i);
    months.push(dt.toLocaleDateString(locale, { month: 'short' }));
  }
  return months;
};

export const useDateTime = () => ({
  constructUTC,
  formatDate,
  getLocalFormat,
  getMonths,
});
