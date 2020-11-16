console.log("foooo");

// Cat facts api
fetch(`https://cat-fact.herokuapp.com/facts`)
	.then((response) => response.json())
	.then((data) => {
		console.log(data.all.slice(0, 20));
		// months = months.filter((month,idx) => idx < 2)
	})
	.catch(error => {console.error(error)});

// Cat api
var myHeaders = new Headers({
    'Content-Type': 'application/json',
    'x-api-key': '5a26a363-ea60-46d9-821d-4ff4a3a67223'
});

// fetch("https://api.thecatapi.com/v1/images/search")
fetch(`https://api.thecatapi.com/v1/breeds`, { method: 'GET', headers: myHeaders })
	.then((response) => response.json())
	.then((data) => {
		console.log(data); // 67 breeds

		data.forEach((cat) => {
			console.log(cat.name);
			console.log(cat.description);
			console.log("----------------------");
		});
	})
	.catch(error => {console.error(error)});