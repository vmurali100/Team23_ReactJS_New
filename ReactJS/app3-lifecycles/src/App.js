import logo from './logo.svg';
import './App.css';
import LifeCycleCopm from './LifeCycleCopm';
import ExampleOne from './LifeCycleHooks/ExampleOne';

function App() {
  
  return (
    <div className="App">
    {/* <LifeCycleCopm/> */}
    <ExampleOne myAge = {40}/>
    </div>
  );
}

export default App;
