import View from './view';
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your search :(';
  _message = '';

  _generateMarkup(data) {
    return data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
