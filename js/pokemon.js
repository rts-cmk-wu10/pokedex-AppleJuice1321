const URL = new URLSearchParams(window.location.search)

// START SPINNER
const SPINNER = document.querySelector(".spinner")

function loading() {
    SPINNER.style.display = "block"
}

console.log(URL.get("name"))

fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("name")}`)
.then(function(response) {
    if(response.status === 200) {
        return response.json()
    } else {
        document.body.innerText += "ups, noget gik galt. Prøv igen senere"
}
})
.then(function database(data) {
    // SKJUL SPINNER
    if(database) {
        SPINNER.style.display = "none"
    }

    console.log(data.sprites.other["official-artwork"].front_default)
    const DIV = document.querySelector(".pokemon")
    DIV.innerHTML = `
    <h1>${data.name}</h1>
    <span class="imagePlaceholder">
        <svg class="placeholder-svg" viewBox="0 0 300 100">
            <polygon points="0 0, 100 0, 100 60, 0 60" style="fill:red;stroke:black;stroke-width:1" />
        </svg>
    </span>
    <p>Height: ${data.height}</p>
    <p>Abilities</p>
    <ul>${data.abilities.map(
        elem => `<li>${elem.ability.name}</li>`
        // makes space between arrays instead of commas
        ).join(" ")}</ul>`

        // instansieres
        const IMG = new Image()
        // finder billedets adreese på internettet
        IMG.src = data.sprites.other["official-artwork"].front_default

        // Når billedet loades, skal funktionen køres
        IMG.onload = function() {
            // gør placeholder billedet usynlig
            DIV.querySelector(".imagePlaceholder svg").style.display = "none"
            // tilføje billedet til img kontaineren
            DIV.querySelector(".imagePlaceholder").append(IMG)
        }
        // NU HAR VI ET PLACERHOLDER BILLEDE DER VISER 
    })

    // <img src="${data.sprites.other["official-artwork"].front_default}">