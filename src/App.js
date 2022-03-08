import Login from "./components/Login.js";
import Home from "./components/Home";
import {BrowserRouter as Router , Routes , Route } from "react-router-dom";
function App() {
  return (
    <Router>
    <div className="App">
      <Routes >
        <Route path="/login" element={<Login/>} />
        <Route path='/Home/:userId' element={<Home/>} />
      
      </Routes >
      <Login />
    </div>
    </Router>
  );
}

export default App;
