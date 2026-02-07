export const dateUtils = {
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  getToday() {
    return this.formatDate(new Date());
  },

  getDateFromString(dateString) {
    return new Date(dateString);
  },

  getMonthRange(year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    return {
      start: this.formatDate(startDate),
      end: this.formatDate(endDate)
    };
  },

  getYearRange(year) {
    return {
      start: `${year}-01-01`,
      end: `${year}-12-31`
    };
  }
};
