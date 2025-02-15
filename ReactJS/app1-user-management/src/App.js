import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBar';
import UserList from './Components/UserList';

function App() {
  return (
    <div>
      <h1>User List</h1>
      <SearchBar />
      <UserList />
    </div>
  );
}

export default App;
