
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Gerenciamento from './pages/Gerenciamento';

// Verifica se existe um token antes de exibir a página protegida.
function RotaProtegida({ children }) {
  const token = localStorage.getItem('token');

  return token
    ? children
    : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <RotaProtegida>
              <Gerenciamento />
            </RotaProtegida>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
