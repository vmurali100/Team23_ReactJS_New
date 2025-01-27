import logo from "./logo.svg";
import "./App.css";
import Users from "./Components/Users";
import Products from "./Components/Products";
import CartManagement from "./Components/CartManagement";

function App() {
  return (
    <div className="App">
      <Users />
      <hr />
      <Products />
      <hr />
    <CartManagement/>
    </div>
  );
}

export default App;
