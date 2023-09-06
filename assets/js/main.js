const pokemonList = document.getElementById("pokemon-list")
const loadMoreButton = document.getElementById("loadMoreButton")
const loadLessButton = document.getElementById("loadLessButton")
const maxLimit = 15
const limit = 5
let offset = 0


const loadMorePokemons = (offset, limit) => {
    pokeApi.getPokemons(offset, limit).then((pokeList = []) => {
        pokemonList.innerHTML += pokeList.map((poke)=> `
            <li id="pokemon-card" class="${poke.type}">
            <div class="header">
                    <span class="poke-id">#${poke.id}</span>
                    <span class="poke-name">${poke.name}</span>
            </div>        
                    <div class="container">
                    <div class="type-container">
                        ${poke.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                    </div>
                    </div>
                    <img class="pokemon-img"
                        src="${poke.image}" />
                    <img class="pokeball-img"
                        src="./assets/img/pokeball.png" />
            </li>` 
        ).join('')
    })
}

loadMorePokemons(offset, limit)
loadMoreButton.addEventListener('click',()=>{
    offset += limit
    const nextPage = offset + limit
    if( nextPage >= maxLimit) {
        const newLimit = maxLimit - offset
        loadMorePokemons(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadMorePokemons(offset, limit)
    }
})
