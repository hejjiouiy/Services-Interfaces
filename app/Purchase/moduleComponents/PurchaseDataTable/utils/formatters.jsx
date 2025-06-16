export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      const simpleDate = new Date(dateString + 'T00:00:00Z');
      if (isNaN(simpleDate.getTime())) {
        return dateString;
      }
      return simpleDate.toLocaleDateString();
    }
    return date.toLocaleDateString();
  } catch (error) {
    console.error("Failed to parse date:", dateString, error);
    return dateString;
  }
};

export const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount);
};

export const truncateId = (id, length = 8) => {
  return id.length > length ? `${id.substring(0, length)}...` : id;
};
