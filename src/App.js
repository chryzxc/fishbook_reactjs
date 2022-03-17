import Login from "./components/Login.js";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from "./context/UserContext.js";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/Home/" element={<Home />} />
          </Routes>
          <Login />
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
