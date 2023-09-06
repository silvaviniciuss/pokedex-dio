const pokeApi = {}

const pokemonModal = (pokeDetail) => {
    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.types = pokeDetail.types.map((type)=>type.type.name)
    pokemon.type = pokemon.types[0]
    pokemon.image = pokeDetail.sprites.other["official-artwork"].front_default

    return pokemon
}


pokeApi.getPokemonDetail = async (pokemon) => {
    return await fetch(pokemon.url)
        .then((response) => response.json())
        .then(pokemonModal)
    
}   

pokeApi.getPokemons = async (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return await fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons)=>pokemons.map((pokeApi.getPokemonDetail)))
    .then((detailRequest)=> Promise.all(detailRequest))
    .then((pokemonsDetails)=>pokemonsDetails)
}