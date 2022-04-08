import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import ContentSection from "./Components/ContentSection";
import Thankyou from "./Components/Thankyou/Thankyou";
import { Route, Switch } from "react-router-dom";
export const ThemeContext = React.createContext();
const App = () => {
  const [lightBackground, setLightBackground] = useState(true);
  const changeColor = () => {
    setLightBackground(!lightBackground);
  };
  return (
    <React.StrictMode>
      <Header changeColor={changeColor} />

      <ThemeContext.Provider value={lightBackground}>
        <Switch>
          <Route exact path="/" render={() => <ContentSection />}></Route>
          <Route exact path="/thankyou" render={() => <Thankyou />}></Route>
        </Switch>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

export default App;
