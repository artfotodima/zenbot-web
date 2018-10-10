import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import store from './app/store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Fabric>
  <Provider store={store}>
    <App />
  </Provider>
  </Fabric>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
