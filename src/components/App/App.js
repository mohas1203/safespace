import './App.css';
import Header from '../Header/Header'
import Landing from '../Landing/Landing'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Home from '../Home/Home'
import CreatePost from '../CreatePost/CreatePost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {

  const [user] = useAuthState(auth)

  let authenticatedRoutes;

  if (user){
    authenticatedRoutes = (
      <>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      </>
    )
  }
  
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
        {authenticatedRoutes}
      </Switch>
    </Router>
    </>
  );
}

export default App;
