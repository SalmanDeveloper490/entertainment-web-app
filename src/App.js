import "./App.css";
import BottomNavbar from "./components/bottomNav/BottomNavbar";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Trending from "./components/pages/trending/Trending";
import Movies from "./components/pages/movies/Movies";
import Series from "./components/pages/series/Series";
import Search from "./components/pages/search/Search";
import { Container } from "@material-ui/core";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="App">
          <Container>
            <Switch>
              <Route exact path="/" component={Trending} />
              <Route exact path="/movies" component={Movies} />
              <Route exact path="/series" component={Series} />
              <Route exact path="/search" component={Search} />
            </Switch>
          </Container>
        </div>
        <BottomNavbar />
      </Router>
    </>
  );
}

export default App;
