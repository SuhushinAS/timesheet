import { App } from 'app/App';
import { store } from 'shared/config/store';
import { LocaleProvider } from 'entities/locale/ui/LocaleProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export default (): JSX.Element => (
  <React.StrictMode>
    <Provider store={store}>
      <LocaleProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocaleProvider>
    </Provider>
  </React.StrictMode>
);
