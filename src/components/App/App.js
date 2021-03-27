import './App.css';
import Header from '../Header/Header'
import Landing from '../Landing/Landing'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Home from '../Home/Home'
import CreatePost from '../CreatePost/CreatePost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
    <Header />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/createpost">
          <CreatePost />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
