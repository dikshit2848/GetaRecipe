import { API_URL, RESULTS_PER_PAGE } from './config';
import { async } from 'regenerator-runtime';
import { getJson } from './helpers';
import recipeView from './views/recipeView';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const result = await getJson(`${API_URL}${id}`);
    const { recipe } = result.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    throw error;
    // console.error('inside model error', error);
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(item => {
      return {
        id: item.id,
        title: item.title,
        publisher: item.publisher,
        image: item.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = Number(page);

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  //   if (page * state.search.resultsPerPage > state.search.results.length) {
  //     return state.search.results.slice(
  //       start,
  //       start + (state.search.results.length % 10)
  //     );
  //   }
  return state.search.results.slice(start, end);
};
