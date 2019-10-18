import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <NavLink
            exact
            className="text-link"
            activeClassName="active"
            to="/"
            replace
          >
            home
          </NavLink>
        </li>
        <li>
          <NavLink className="text-link" activeClassName="active" to="/contact">
            contact
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
