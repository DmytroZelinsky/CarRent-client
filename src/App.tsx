import './App.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AutoParks from './Pages/AutoParks/AutoParks';
function App() {
  return (
    <Router>
      <HeaderContainer/>
        <Route exact path='/autoparks'>
          <AutoParks/>
        </Route>
    </Router>
  );
}

export default App;
