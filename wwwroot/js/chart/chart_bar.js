var js = jQuery.noConflict(true);
var chart = [];
// check api for Admin

js.ajax({
  // url: "https://grim.co.in:3002/api/v4/indent/dashboard",
  // url: "https://grim.co.in:3002/api/v4/admin/dashboard",
  url: host + path + role + "dashboard",
  type: "POST",
  contentType: "application/json;charset=utf-8",
  dataType: "json",
  data: JSON.stringify({
    user_id: 1,
    from_date: "2023-08-02",
    to_date: "2023-08-02",
  }),
  async: false,
  success: function (data) {
    chartdata(data);
  },
  error: function (err) {
    alert(err);
  },
});

function chartdata(data) {
  var labels_Data = [];
  var datasets = [];
  var obj = {};
  var backgroundColor = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(255, 205, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(201, 203, 207, 0.5)",
    "rgba(255, 99, 132, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(255, 205, 86, 0.5)",
  ];
  var borderColor = [
    "rgba(255, 99, 132, 0.7)",
    "rgba(255, 159, 64, 0.7)",
    "rgba(255, 205, 86, 0.7)",
    "rgba(75, 192, 192, 0.7)",
    "rgba(54, 162, 235, 0.7)",
    "rgba(153, 102, 255, 0.7)",
    "rgba(201, 203, 207, 0.7)",
    "rgba(255, 99, 132, 0.7)",
    "rgba(255, 159, 64, 0.7)",
    "rgba(255, 205, 86, 0.7)",
  ];

  data.orders.forEach((order) => {
    labels_Data.push(order.address);
    for (const key in order) {
      if (key !== "address") {
        if (!obj[key]) {
          obj[key] = [];
        }
        obj[key].push(order[key]);
      }
    }
  });

  for (const key in obj) {
    datasets.push({
      label: key,
      data: obj[key],
      borderWidth: 1,
      backgroundColor: [backgroundColor[Object.keys(obj).indexOf(key)]],
      borderColor: [borderColor[Object.keys(obj).indexOf(key)]],
    });
  }

  console.log(datasets);
  console.log(labels_Data);

  const ctx = document.getElementById("myChart");

  //topLabels plugin block
  const topLabels = {
    afterDatasetsDraw(chart, args, pluginOption) {
      const {
        ctx,
        scales: { x, y },
      } = chart;

      chart.data.datasets[0].data.forEach((datapoint, index) => {
        const datasetArray = [];

        chart.data.datasets.forEach((dataset) => {
          datasetArray.push(dataset.data[index]);
        });

        function totalSum(total, values) {
          return total + values;
        }

        let sum = datasetArray.reduce(totalSum, 0);

        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = chart.data.datasets[0].borderColor[index];
        ctx.textAlign = "center";
        ctx.fillText(
          sum,
          x.getPixelForValue(index),
          chart.getDatasetMeta(1).data[index].y - 10
        );
      });
    },
  };

  const config = {
    type: "bar",
    data: {
      labels: labels_Data,
      datasets: datasets,
    },
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grace: 4,
        },
      },
    },
    plugins: [ChartDataLabels, topLabels],
  };

  // const labels = Utils.months({ count: 8 });
  var chart = new Chart(ctx, config);
}
