import React from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import ContentSection from "./Components/ContentSection";
import Thankyou from "./Components/Thankyou/Thankyou";
import { Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <React.StrictMode>
      <Header />

      <Switch>
        <Route exact path="/" render={() => <ContentSection />}></Route>
        <Route exact path="/thankyou" render={() => <Thankyou />}></Route>
      </Switch>
    </React.StrictMode>
  );
};

export default App;
