
// ***************************** Data visualisation using chart js ********************************

(function() {

  var tableRows = document.getElementsByTagName("table")[0].lastElementChild.children;
  console.log(tableRows);
  // console.log(tableRows.length);

  let labelsTable = [];
  let dataset1 = [];
  let dataset2 = [];

  Array.from(tableRows).forEach((row) => {
    labelsTable.push(row.children[0].innerHTML);
    dataset1.push(row.children[4].innerHTML);
    dataset2.push(row.children[5].innerHTML);
    // console.log(row);
  });

  // console.log(labelsTable);
  // console.log(dataset1);
  // console.log(dataset2);

  // Bar chart js to be changed
  var context = document.getElementById("mychart").getContext("2d");
  var chart = new Chart(context, {
      type: 'bar',
      data: {
        labels: [], // cat greeds
        datasets: [      	
          {
            label: "intelligence",
            backgroundColor: "#3e95cd",
            data: []
          },
          {
            label: "adaptability",
            backgroundColor: "#8e5ea2",
            data: []
          }
        ]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'Cats by breed, showing intelligence and adaptability for each'
        }
      }
  });

  chart.data.labels = labelsTable;
  chart.data.datasets[0].data = dataset1;
  chart.data.datasets[1].data = dataset2;
  chart.update();

})();