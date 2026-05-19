import { useState, useEffect } from "react";
import { SideBar } from "./components/sidebar/sideBar";
import { MainContent } from "./components/main/mainContent";
import { GlobalStyle } from "./Styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/pages/login/login";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogin = () => setIsLoggedIn(true);

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
