import './App.css';
import Header from '../Header/Header'
import Landing from '../Landing/Landing'
import Login from '../Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
    <Header />
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
