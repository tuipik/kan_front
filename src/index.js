import 'bootstrap/dist/css/bootstrap.css';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import router from './router';
import { Provider } from 'react-redux';
import { store, persistor } from './store';


const el = document.getElementById('root');
const root = createRoot(el);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
);