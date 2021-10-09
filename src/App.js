import Login from './componentes/Login';
import Menu from './componentes/Menu';
import Register from './componentes/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Login/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;