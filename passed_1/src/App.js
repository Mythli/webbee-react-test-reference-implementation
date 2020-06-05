import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routing/routes';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <StrictMode>
          <Routes />
        </StrictMode>
      </BrowserRouter>
    </>
  );
};

App.displayName = 'App';

export default App;
