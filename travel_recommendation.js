const btnSearch = document.getElementById('btnSearch');

function searchRecomend() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('./travel_recommendation_api.json')
        .then((response) => response.json())
        .then(data => {
            let tempA =[];
            let aLen;
            let result2 = [];

            //debugger;

            const result = data.countries.find(item => item.name.toLowerCase() === input);

            if (!result) {
                aLen = data.countries.length;
                for (let i = 0; i < aLen; i++) {
                    let len2 = data.countries[i].cities.length;
                    for (let j = 0; j < len2; j++) {
                        if (input.length >2 && data.countries[i].cities[j].name.toLowerCase().search(input) >=0) {
                            result2.push(data.countries[i].cities[j]);
                            // console.log(data.countries[i].cities[j].name)
                        }
                    }
                }
            }

            if (result) {
                tempA = result.cities;
            } else if (result2.length > 0) {
                tempA = result2;
            } else if (input == "temples" || input == "temple") {
                tempA = data.temples;
            } else if (input == "beaches" || input == "beach") {
                tempA = data.beaches;
            } else {
                tempA = [];
            }

            if (tempA.length > 0) {
                aLen = tempA.length;
                for (let i = 0; i < aLen; i++) {
                    resultDiv.innerHTML += `<h2>${tempA[i].name}</h2>`;
                    resultDiv.innerHTML += `<img src=".\\image\\${tempA[i].imageUrl}" alt="hjh">`;
                    resultDiv.innerHTML += `<p>${tempA[i].description}</p>`;
                    document.getElementById('result').style.display = "list-item";  //" "inline-flex";
                    document.getElementById('result').style.backgroundColor = "orange";
                }    
            } else {
                resultDiv.innerHTML = 'Destination or keyword not found. Please try again.';
                document.getElementById('result').style.display = "inline-flex";
                document.getElementById('result').style.backgroundColor = "orange";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

function clearRecomend() {
    document.getElementById('result').style.display = "none";
}

btnSearch.addEventListener('click', searchRecomend);
btnClear.addEventListener('click', clearRecomend);

