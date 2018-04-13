# React-Artibox
React Article Box

## Get Started

Initialize modules
```javascript
// @flow
// index.jsx

import React from 'react';
import { 
  createConfigProvide,
  Base64ImageHandler,
} from 'react-artibox';
import AricleEditor from './ArticleEditor.jsx';

type UploadResponseType = {
  filename: ?string,
};

const ArtiboxProvider = createConfigProvider({
  imageHandler: new Base64ImageHandler(),
});

function App() {
  return (
    <ArtiboxProvider>
      <ArticleEditor />
    </ArtiboxProvider>
  );
}

export default App;
```

Implement Editor on your site
```javascript
// ArticleEditor.jsx

import React, { Component } from 'react';
import Editor from 'react-artibox/editor';

const styles = {
  color: '#4a4a4a',
  fontSize: 24,
};

class ArticleEditor extends Component {
  submit(data) {
    // Upload to API Server
    // data structure
    //{
    //  title: 'I am title',
    //  blocks: [{
    //    type: 'ARTIBOX/TEXT',
    //    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
    //  }, {
    //    type: 'ARTIBOX/IMAGE',
    //    link: '90ab0747709b3cc10f37dfd6b92b1adaf4ea0b36.jpg'
    //  }],
    //}
  }

  render() {
    return (
      <h1 style={styles.title}>Article Editor</h1>
      <Editor onSubmit={data => this.submit(data)} />
    );
  }
}

export default ArticleEditor;
```

Display on Viewer
```javascript
// ArticleViewer.jsx

import React, { Component } from 'react';
import Viewer from 'react-artibox/viewer';

class ArticleViewer extends Component {
  state = {
    data: null,
  }

  componentDidMount() {
    fetch('https://DATA_HOST/articles/2')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          data,
        });
      });
  }

  render() {
    return <Viewer data={this.state.data} />;
  }
}
```
