import View from './view';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No saved recipes';
  _message = '';

  addhandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup(data) {
    return data.map(bookmark => previewView.render(bookmark, false)).join('');
  }
}

export default new BookmarksView();
