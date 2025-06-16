import { statusColors, typeColors, priorityColors } from '../config/colorSchemes';

export const generateDoughnutChartData = (data, colors, labelSuffix = ' demandes') => {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const backgroundColors = labels.map(label =>
    `rgba(${colors[label]?.rgb || '128, 128, 128'}, 0.7)`
  );

  return {
    labels,
    datasets: [
      {
        label: 'Nombre de demandes',
        data: values,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };
};

export const generateBarChartData = (data, label, color = 'rgba(0, 84, 63, 0.7)') => {
  const sortedEntries = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const labels = sortedEntries.map(([label]) => label);
  const values = sortedEntries.map(([, value]) => value);

  return {
    labels,
    datasets: [
      {
        label,
        data: values,
        backgroundColor: color,
        borderColor: color.replace('0.7', '1'),
        borderWidth: 1,
      },
    ],
  };
};

export const generateLineChartData = (purchases, field, label, color = 'rgba(0, 84, 63, 1)') => {
  const monthData = purchases.reduce((acc, purchase) => {
    const date = new Date(purchase.dateDemande);
    const year = date.getFullYear();
    const month = date.getMonth();
    const yearMonth = `${year}-${String(month + 1).padStart(2, '0')}`;
    
    if (field === 'count') {
      acc[yearMonth] = (acc[yearMonth] || 0) + 1;
    } else if (field === 'totalEstimated') {
      acc[yearMonth] = (acc[yearMonth] || 0) + purchase.totalEstimated;
    }
    
    return acc;
  }, {});

  const sortedYearMonths = Object.keys(monthData).sort();
  const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  const labels = sortedYearMonths.map(ym => {
    const [year, month] = ym.split('-');
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  });
  
  const data = sortedYearMonths.map(ym => monthData[ym]);

  return {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color.replace('1)', '0.1)'),
        tension: 0.4,
        fill: true
      },
    ],
  };
};