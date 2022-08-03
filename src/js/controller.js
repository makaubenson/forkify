import * as model from './modal.js';
import recipeView from './views/recipeView.js';
// import icons from '../img/icons.svg'; //Parcel1
import icons from 'url:../img/icons.svg'; //Parcel 2
// console.log(icons);
import 'core-js/stable'; //polyfilling everything else
import 'regenerator-runtime/runtime'; //polyfilling async await
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2 - endpoint

///////////////////////////////////////
const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
  <svg>
    <use href="${icons}.svg#icon-loader"></use>
  </svg>
</div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    renderSpinner(recipeContainer);
    // 1) Loading Recipe

    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

    ///
  } catch (err) {
    alert(err);
  }
};
// showRecipe();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
