import { Route, Switch } from 'react-router-dom';
import './App.css';
import Edit from './pages/Edit';
import Home from './pages/Home';
import View from './pages/View';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/view/:stuId" component={View} />
        <Route exact path="/edit/:stuId" component={Edit} />
        <Route exact path="*">
          404 Not Found!
        </Route>
      </Switch>
    </div>
  );
}

export default App;
