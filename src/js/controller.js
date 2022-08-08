import * as model from './modal.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable'; //polyfilling everything else
import 'regenerator-runtime/runtime'; //polyfilling async await
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();
    // 1) Loading Recipe

    await model.loadRecipe(id);
    // const { recipe } = model.state;
    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2)load search results
    await model.loadSearchResults(query);

    //3) render results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(6));

    //4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResults();

const controlPagination = function (goToPage) {
  //1) render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2) render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update Recipe Servings in the state
  model.updateServings(newServings);

  //update recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
