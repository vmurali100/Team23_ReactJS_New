import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Header';
import { Banner } from './Components/Banner';
import { Popular } from './Components/Popular';

function App() {
  return (
    <div className="App">
      <Header/>
      <Banner/>
      <Popular/>
    </div>
  );
}

export default App;
