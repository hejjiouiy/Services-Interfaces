const getCommonChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          family: 'Geist Sans, sans-serif'
        }
      }
    }
  }
});
export default getCommonChartOptions;