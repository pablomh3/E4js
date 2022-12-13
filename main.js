const form = document.getElementById('form');
const searchPokemon = document.querySelector('#input');
const container = document.querySelector("#container");

const fetchPokemon = async (e) => {
  e.preventDefault();
  const searchedPokemon = searchPokemon.value 
  if (searchedPokemon == '' || NaN) {
    container.classList.add("container");
    container.innerHTML = `<h2 class="error"> Ingrese un ID numérico de Pokemon</h2>`;
    return;
  }
  const fetchedPokemon = await requestPokemon (searchedPokemon);
  
}

const renderError = async (error) =>{
  container.classList.add("container")
  container.innerHTML= `<h2 class="error"> No se encontró el Pokemon :(</h2>`
}

const renderPokemon = async (data) =>{
  container.classList.add("container");
  container.innerHTML = `<img src="${data.sprites.front_default}" class="img" alt="pokemon">
  <h2 class="h2">${data.name.toUpperCase()}</h2>
  <div class="text"> 
    <p> types: ${data.types.map((tipo) => {
      return `${tipo.type.name} `;
    })
    .join("")} </p>
  
    <p class="weight"> weight: ${data.weight /10 } kg</p>
    <p class="height"> height: ${data.height /10} mts</p>
  </div>`;
}
const requestPokemon = async (pokemon) => {
  const baseURL= `https://pokeapi.co/api/v2/`;
  const queryParams = `pokemon/${pokemon}`;

  try {
    const response = await fetch(baseURL + queryParams);
    const data = await response.json();
    console.log(data);
    renderPokemon(data);
    return data;
  } catch (error){
    renderError();
  }
}
const init = () => {
  form.addEventListener('submit', fetchPokemon)
}
init();

 