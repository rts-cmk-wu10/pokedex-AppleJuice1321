// Tager fat i urlns query parameter
const URL = new URLSearchParams(window.location.search)
// tager værdien af offset parameteren
// parseInt fortolker som en integer = nummer
const OFFSET = parseInt(URL.get("offset") || 0)

// Qselector for at ændre på qparamterens værdi via et click
const NEXT_PAGE = document.querySelector(".nextPage")
const PREVIOUS_PAGE = document.querySelector(".previousPage")
const FIRST_PAGE = document.querySelector(".firstPage")
const LAST_PAGE = document.querySelector(".lastPage")

// ændre på qparam's value
FIRST_PAGE.href = `/?offset=0`
LAST_PAGE.href = `/?offset=1280`


// Laver et promise
// I slutningen bruges et dollertegn med offset
fetch(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${OFFSET}`)
// even metoder
// callback, svarer på den promise
.then(function(response) {
    // 200 = (ok/success) succe beskeder
    // 300 = (redirect)viderføres
    // 400 = client error(s)
    // 500 = server error(s)
    
    // brug. status === 200 for at sikre en forbindelse til serveren
if(response.status === 200) {
    // tager json indholdet og sender det videre til nøste linjer uden for scopet
    return response.json()
} else {
    // advarer om forbindelses problemer
    document.body.innerText += "ups, noget gik galt. Prøv igen senere"
}
})

// promise-catcher (modtager indeholdet af den data vi har fået fra linje 14 med return response)
.then(function(data) {
    
    // turnary operator, skal have if og else
    // ${Math.max(OFFSET - 20, 0)}
    NEXT_PAGE.href = `/?offset=${OFFSET + 8 > data.count ? 1280 : OFFSET + 8}`
    PREVIOUS_PAGE.href = `/?offset=${OFFSET < 8 ? 0 : OFFSET - 8}`


    const UL = document.querySelector(".name__list")
    // tager sig af et array og viser dem alle(her er det names)
    data.results.forEach(function(result) {
        // console.log(result.name)
        const LI = document.createElement("li")
        // LI.innertext = result.name
        LI.innerHTML = `<a href="/pokemon.html?name=${result.name}">${result.name}</a>`
        UL.append(LI)
    })
})