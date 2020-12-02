import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './pages/Home/Home';
import Header from '../src/components/Header/Header';
import Form from './pages/Form/Form';
import List from './pages/List/List';
import Update from './pages/Update/Update';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/list" component={List} />
          <Route exact path="/update" component={Update} />
        </Switch>
    </BrowserRouter>
  )
}

export default App;
