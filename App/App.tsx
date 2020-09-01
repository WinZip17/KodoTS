import React from 'react';
import {Provider} from 'react-redux';
import store from './Stores/store';
import Main from './Main';

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
