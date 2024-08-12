import { ConfigProvider } from 'antd';
import Login from './views/onboarding/Login';
import UserPages from './views/UserPages';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {


  return (
    <ConfigProvider 
    theme={{
      token: {
        colorPrimary: '#0A95CC',
        // borderRadius: 2,
        // colorBgContainer: '#f6ffed',
      },
    }}
  >
    
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserPages />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
