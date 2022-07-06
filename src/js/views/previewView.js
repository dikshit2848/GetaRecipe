import View from './view';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup(item) {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              item.id === id && 'preview__link--active'
            }"  href="#${item.id}">
                <figure class="preview__fig">
                    <img src="${item.image}" alt="${item.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${item.title}</h4>
                    <p class="preview__publisher">${item.publisher}</p>
                    <div class="preview__user-generated ${
                      !item.key && 'hidden'
                    }">
                      <svg>
                        <use href="${icons}#icon-user"></use>
                      </svg>
                    </div>
                  </div>
            </a>
        </li>`;
  }
}

export default new PreviewView();
