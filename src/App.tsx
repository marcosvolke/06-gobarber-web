import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

import { AuthProvider } from './context/AuthContext';

import ToastContainer from './components/toastContainer';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <ToastContainer />

    <GlobalStyle />
  </>
);

export default App;
