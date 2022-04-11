import './App.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AutoParks from './Pages/AutoParks/AutoParks';
import AutoPark from './Pages/AutoPark/AutoPark';
import Booking from './Pages/Booking/Booking';
import Home from './Pages/Home/Home';
import 'antd/dist/antd.css';
function App() {
  return (
    <Router>
      <HeaderContainer/>
        <Switch>
        <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/home'>
            <Home/>
          </Route>
          <Route exact path='/autoparks'>
            <AutoParks/>
          </Route>
          <Route exact path='/autopark/:id'>
            <AutoPark/>
          </Route>
          <Route exact path='/booking'>
            <Booking/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
