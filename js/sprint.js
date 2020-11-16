var tableCats = document.getElementsByTagName("table")[0];
// console.log(tableCatsBody);

// Cat facts api
fetch(`https://cat-fact.herokuapp.com/facts`)
	.then((response) => response.json())
	.then((data) => {
		// console.log(data.all.slice(0, 20));
		// months = months.filter((month,idx) => idx < 2)
	})
	.catch(error => {console.error(error)});

// Cats Api
var myHeaders = new Headers({
    'Content-Type': 'application/json',
    'x-api-key': '5a26a363-ea60-46d9-821d-4ff4a3a67223'
});

fetch(`https://api.thecatapi.com/v1/images/search?limit=100`, { method: 'GET', headers: myHeaders })
// fetch(`https://api.thecatapi.com/v1/breeds`, { method: 'GET', headers: myHeaders })
	.then((response) => response.json())
	.then((data) => {
		// console.log(data);
		// let cats = data.filter((cat) => cat.breeds.length > 0); // filter by breeds.length > 0

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

		var tableCatsBody = tableCats.lastElementChild;
		var tableCatsColsNumber = tableCats.firstElementChild.firstElementChild.children.length;
		var template = document.querySelector("#template-tr");

		cats.forEach((cat, index) => {     
			console.log(cats[index]);
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
		});
	})
	.catch(error => {console.error(error)});