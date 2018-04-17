// @flow
/* eslint global-require: 0, import/no-extraneous-dependencies: 0 */

import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import SimpleEditor from './SimpleEditor';

ReactDOM.render(<SimpleEditor />, document.getElementById('root'));

async function renderPage(Component) {
  const Site = (
    <AppContainer>
      <Component />
    </AppContainer>
  );

  ReactDOM.render(Site, document.getElementById('root'));
}

renderPage(SimpleEditor);

if (module.hot) {
  module.hot.accept('./SimpleEditor.jsx', () => renderPage(require('./SimpleEditor.jsx').default));
}
