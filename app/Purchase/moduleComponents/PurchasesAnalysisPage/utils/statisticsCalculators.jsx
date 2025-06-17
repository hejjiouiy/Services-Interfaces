export const calculatePurchaseStatistics = (purchases) => {
  const totalPurchases = purchases.length;

  const countsByStatus = purchases.reduce((acc, p) => {
    acc[p.etatValidation] = (acc[p.etatValidation] || 0) + 1;
    return acc;
  }, {});

  const countsByType = purchases.reduce((acc, p) => {
    acc[p.typeDemande] = (acc[p.typeDemande] || 0) + 1;
    return acc;
  }, {});

  const countsByPriority = purchases.reduce((acc, p) => {
    acc[p.priorite] = (acc[p.priorite] || 0) + 1;
    return acc;
  }, {});

  const totalEstimatedBudget = purchases.reduce((sum, p) => sum + p.totalEstimated, 0);
  const averageEstimatedBudget = totalPurchases > 0 ? totalEstimatedBudget / totalPurchases : 0;

  const materialsCount = purchases.reduce((sum, p) => sum + (p.materials?.length || 0), 0);
  const averageMaterialsPerPurchase = totalPurchases > 0 ? materialsCount / totalPurchases : 0;

  // Aggregate total cost per material designation across all purchases
  const materialTotalCosts = purchases.reduce((acc, purchase) => {
      (purchase.materials || []).forEach(material => {
           const itemTotal = material.prix_unitaire_estime * material.quantite;
           acc[material.designation] = (acc[material.designation] || 0) + itemTotal;
      });
      return acc;
  }, {});

   // Sort materials by total cost and get top N
  const topMaterialsByCost = Object.entries(materialTotalCosts)
    .sort((a, b) => b[1] - a[1])
    .map(([designation, totalCost]) => ({ designation, totalCost }))
    .slice(0, 5);

  return {
    totalPurchases,
    countsByStatus,
    countsByType,
    countsByPriority,
    totalEstimatedBudget,
    averageEstimatedBudget,
    materialsCount,
    averageMaterialsPerPurchase,
    topMaterialsByCost
  };
};

export const calculateBudgetByCategory = (purchases, categoryField) => {
  return purchases.reduce((acc, purchase) => {
    acc[purchase[categoryField]] = (acc[purchase[categoryField]] || 0) + purchase.totalEstimated;
    return acc;
  }, {});
};