import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Header';
import { Banner } from './Components/Banner';
import { Popular } from './Components/Popular';
import Team from './Components/Team';

function App() {
  return (
    <div className="App">
      <Header/>
      <Banner/>
      <Popular/>
      <Team/>
    </div>
  );
}

export default App;
