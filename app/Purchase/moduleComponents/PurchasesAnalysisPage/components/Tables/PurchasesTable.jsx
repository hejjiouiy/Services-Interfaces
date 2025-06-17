import React from 'react';
import Link from 'next/link';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const PurchasesTable = ({ 
  title, 
  purchases, 
  type = "recent", 
  totalPurchases = 0,
  showLink = true 
}) => {
  const getColumns = () => {
    switch (type) {
      case "recent":
        return ['ID', 'Ligne Budgétaire', 'Type', 'Date Soumission', 'Budget Est.', 'Statut'];
      case "expensive":
        return ['ID', 'Détails', 'Ligne Budgétaire', 'Budget Est.', 'Statut'];
      default:
        return [];
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-main-green mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader columns={getColumns()} />
          <TableBody purchases={purchases} type={type} />
        </table>
      </div>
      {showLink && totalPurchases > purchases.length && (
        <div className="mt-4 text-right">
          <Link href="/purchases" className="text-main-green hover:text-main-green/80 text-sm font-medium">
            Voir toutes les demandes →
          </Link>
        </div>
      )}
    </div>
  );
};

export default PurchasesTable;