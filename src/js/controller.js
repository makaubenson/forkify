import * as model from './modal.js';
import recipeView from './views/recipeView.js';

// console.log(icons);
import 'core-js/stable'; //polyfilling everything else
import 'regenerator-runtime/runtime'; //polyfilling async await
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2 - endpoint

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();
    // 1) Loading Recipe

    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

    //
  } catch (err) {
    // alert(err);
    // console.error(err);

    recipeView.renderError();
  }
};
// controlRecipes();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
