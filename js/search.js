const DATALIST = document.querySelector("#pokemons")
const SEARCH_FIELD = document.querySelector(".pokemon__search")

// Når søgefeltet er i fokus, vis dataen med alle navne, evtl mere
SEARCH_FIELD.addEventListener("focus", getDataList)
// forhindrer i at der bliver tilføjet mere og mere af samme navne
SEARCH_FIELD.addEventListener("focusout", function (event) {
    SEARCH_FIELD.removeEventListener("focus", getDataList)
})

function getDataList(event) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
        // sikkerhed når der tilgåes APi'et
        .then(function (response) {
            if (response.status === 200) {
                return response.json()
            } else {
                document.body.innerText += "ups, noget gik galt. Prøv igen senere"
            }
        })
        // laver en array med hvert navn og tilføjer og viser dette i et html element
        .then(function (data) {
            data.result.forEach(function (pokemon) {
                DATALIST.innerHTML = `<option>${pokemon.name}</option>`
            });
        })
}
