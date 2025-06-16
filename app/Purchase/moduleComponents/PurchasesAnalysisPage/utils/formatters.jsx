export const formatAmount = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
           return dateString;
      }
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch (error) {
      console.error("Failed to parse date:", dateString, error);
      return dateString;
  }
};