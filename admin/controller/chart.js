const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total sale month",
        data: [2, 3, 5, 8, 5, 3, 7, 8, 13, 12, 11, 4],
        borderWidth: 2,
        borderColor: "#36A2EB",
        backgroundColor: "#9BD0F5",
      },
      {
        label: "Sell number",
        data: [2, 3, 4, 6, 13, 5, 7, 11, 3, 6, 10, 3],
        borderWidth: 1,
        borderColor: "#FF6384",
        backgroundColor: "#FFB1C1",
      },
    ],
  },
  options: {
    plugins: {
      colors: {
        forceOverride: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
