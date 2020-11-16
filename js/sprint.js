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