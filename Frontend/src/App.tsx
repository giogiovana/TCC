import { useState, useEffect } from "react";
import { SideBar } from "./components/sidebar/sideBar";
import { MainContent } from "./components/main/mainContent";
import { GlobalStyle } from "./Styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/pages/login/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica token ao carregar o app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  // Login
  const handleLogin = () => setIsLoggedIn(true);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <GlobalStyle />
      <main>
        <BrowserRouter>
          {isLoggedIn ? (
            <>
              <SideBar onLogout={handleLogout} />
              <MainContent />
            </>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </BrowserRouter>
      </main>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
