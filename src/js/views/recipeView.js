import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';
import View from './view';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'we were not able to find what u were looking for ;(';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', e => {
      const clicked = e.target.closest('.btn--tiny');
      if (!clicked) return;
      if (clicked.dataset.update > 0) handler(Number(clicked.dataset.update));
      // e.preventDefault();
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', e => {
      const clicked = e.target.closest('.btn--bookmark');
      if (!clicked) return;
      handler(this._data);
      console.log(clicked);
      // clicked.classlist
    });
  }

  _generateMarkup(recipe) {
    return `
        <figure class="recipe__fig">
            <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  recipe.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  recipe.servings
                }</span>
                <span class="recipe__info-text">servings</span>
                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--increase-servings" data-update="${
                      recipe.servings - 1
                    }">
                        <svg>
                            <use href="${icons}#icon-minus-circle"></use>
                        </svg>
                    </button>
                    <button class="btn--tiny btn--increase-servings" data-update="${
                      recipe.servings + 1
                    }">
                        <svg>
                            <use href="${icons}#icon-plus-circle"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="recipe__user-generated ${!recipe.key && 'hidden'}">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
            </div>
            <button class="btn--round btn--bookmark">
                <svg class="">
                    <use href="${icons}#icon-bookmark${
      recipe.bookmarked ? '-fill' : ''
    }"></use>
                </svg>
            </button>
        </div>
        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(this._generateIngredients).join('')}
            </ul>
        </div>
        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by<span class="recipe__publisher">${
                  recipe.publisher
                }</span>. Please check out directions at their website.
            </p>
            <a class="btn--small recipe__btn" href="${
              recipe.sourceUrl
            }" target="_blank"><span>Directions</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </a>
        </div>`;
  }

  _generateIngredients(item) {
    const { quantity, unit, description } = item;
    return `
    <li class="recipe__ingredient">
        <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${quantity ? fracty(quantity) : ''}</div>
        <div class="recipe__description">
            <span class="recipe__unit">${unit}</span>
            ${description}
        </div>
    </li>`;
  }
}

export default new RecipeView();
