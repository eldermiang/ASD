import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Navbar from './components/Navbar';
import Footer from "./components/Footer";

import Cart from "./pages/Cart"
import Menu from './pages/Menu';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route 
              path="/menu" 
              element={<Menu />}
            />
            <Route 
              path="/cart" 
              element={<Cart />}
            />
            <Route 
              path="/"
              element={<Navigate replace to="/menu"/>}
            />
            {/* <p>{!data ? "Loading..." : data}</p> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
