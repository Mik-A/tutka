import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Frontpage from "../pages/Frontpage";
import Contact from "../pages/Contact";
import SliderTest from "../pages/SliderTest";

const NoPage = () => {
  return <h3>404 - Stupid component so far</h3>;
};

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Frontpage} />
      <Route path="/contact" component={Contact} />
      <Route path="/slidertest" component={SliderTest} />
      <Route component={NoPage} />
    </Switch>
  </main>
);

export default Main;
