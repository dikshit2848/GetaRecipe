import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      //   console.log(btn.dataset);
      const goToPage = btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
      console.log(btn);
    });
  }

  _generateMarkup(data) {
    const numPages = Math.ceil(data.results.length / data.resultsPerPage);
    if (data.page === 1 && numPages > 1) {
      return `
        <button data-goto="${
          data.page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    if (data.page === numPages && numPages > 1) {
      return `
        <button data-goto="${
          data.page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${data.page - 1}</span>
          </button>`;
    }
    if (data.page < numPages) {
      return `
        <button data-goto="${
          data.page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${data.page - 1}</span>
          </button>
           <button data-goto="${
             data.page + 1
           }" class="btn--inline pagination__btn--next">
            <span>Page ${data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    return '';
  }
}

export default new PaginationView();
