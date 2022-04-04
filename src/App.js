import Login from "./components/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext.js";

import Main from "./components/Main";


function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/Main/*" element={<Main />} />
      
          </Routes>
         
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
