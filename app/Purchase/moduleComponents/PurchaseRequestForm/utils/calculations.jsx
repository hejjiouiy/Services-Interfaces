export const calculateTotalCost = (materials) => {
  return materials.reduce((total, item) => {
    return total + (item.prix_unitaire_estime * item.quantite);
  }, 0);
};

export const calculateItemTotal = (unitPrice, quantity) => {
  return unitPrice * quantity;
};