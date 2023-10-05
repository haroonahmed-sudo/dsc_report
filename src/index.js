import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MyContextProvider } from './MyContext'; // Import the context provider

// Use createRoot to render your app
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>,
  </React.StrictMode>
);

reportWebVitals();
