// Cats Api
var myHeaders = new Headers({
    'Content-Type': 'application/json',
    'x-api-key': '5a26a363-ea60-46d9-821d-4ff4a3a67223'
});

fetch(`https://api.thecatapi.com/v1/images/search?limit=100`, { method: 'GET', headers: myHeaders })
	.then((response) => response.json())
	.then((data) => {
		// console.log(data);
		// filter by breeds.length > 0 & unique breed id key
		let cats = data.filter(function (cat) {
	        if (cat.breeds.length > 0) {
				var key = cat.breeds[0].id;

		        if (!this[key]) {
		            this[key] = true;
		            return true;
		        }
		    }
		});

		var tableCats = document.getElementsByTagName("table")[0];
		var tableCatsBody = tableCats.lastElementChild;
		var tableCatsColsNumber = tableCats.firstElementChild.firstElementChild.children.length;
		var template = document.querySelector("#template-tr");
		
		cats.forEach((cat, index) => {  
        	// use template
		    var clone = document.importNode(template.content, true); // tr
			var tdTags = clone.querySelectorAll("td");

            tdTags[0].innerHTML = cats[index].breeds[0].name;
            tdTags[1].firstElementChild.setAttribute("src", cats[index].url);
            tdTags[2].innerHTML = cats[index].breeds[0].origin;
            tdTags[3].innerHTML = cats[index].breeds[0].affection_level;
            tdTags[4].innerHTML = cats[index].breeds[0].adaptability;
            tdTags[5].innerHTML = cats[index].breeds[0].intelligence;

		    document.getElementById("tbody").appendChild(clone);

		    tdTags[6].firstElementChild.addEventListener("click", function() {
		    	setModalData(cats[index]);
		    });

		    // ***************************** Data visualisation using chart js ********************************

			var tableRows = document.getElementsByTagName("table")[0].lastElementChild.children;
			// console.log(tableRows);

			let labelsTable = [];
			let dataset1 = [];
			let dataset2 = [];

			Array.from(tableRows).forEach((row) => {
			labelsTable.push(row.children[0].innerHTML);
			dataset1.push(row.children[4].innerHTML + 2);
			dataset2.push(row.children[5].innerHTML);
			// console.log(row);
			});

			console.log(labelsTable);
			console.log(dataset1);
			console.log(dataset2);

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
		});
	})
	.catch(error => {console.error(error)});

function setModalData(catObject) {
	console.log(catObject);
	document.querySelector("h4.modal-title").innerHTML = catObject.breeds[0].name;

	document.getElementById("modalBodyFirstDiv").children[0].setAttribute("src", catObject.url);
	document.getElementById("modalBodyFirstDiv").children[1].firstElementChild.innerHTML = catObject.breeds[0].description;

	document.getElementById("modalBodySecondDiv").children[0].firstElementChild.innerHTML = catObject.breeds[0].origin;
	document.getElementById("modalBodySecondDiv").children[1].firstElementChild.innerHTML = catObject.breeds[0].affection_level;
	document.getElementById("modalBodySecondDiv").children[2].firstElementChild.innerHTML = catObject.breeds[0].adaptability;
	document.getElementById("modalBodySecondDiv").children[3].firstElementChild.innerHTML = catObject.breeds[0].energy_level;
	document.getElementById("modalBodySecondDiv").children[4].firstElementChild.innerHTML = catObject.breeds[0].intelligence;
	document.getElementById("modalBodySecondDiv").children[5].firstElementChild.innerHTML = catObject.breeds[0].child_friendly;
	document.getElementById("modalBodySecondDiv").children[6].firstElementChild.innerHTML = catObject.breeds[0].dog_friendly;
	document.getElementById("modalBodySecondDiv").children[7].firstElementChild.innerHTML = catObject.breeds[0].temperament;

	document.getElementById("modalBodyLastDiv").children[0].firstElementChild.innerHTML = catObject.breeds[0].wikipedia_url;
}