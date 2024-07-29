import Login from './views/onboarding/Login';
import UserPages from './views/UserPages';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserPages />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
