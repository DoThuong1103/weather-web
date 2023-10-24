import React from "react";
import {
  Link,
  MemoryRouter,
  matchPath,
  useLocation,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { PropTypes } from "prop-types";
import { LeftNavContainer } from "../themes/styled";
import logo from "../img/logo.png";
import { Tab, Tabs } from "@mui/material";
import { Dashboard, Map, Star } from "@mui/icons-material";

// function Router(props) {
//   const { children } = props;
//   if (typeof window === "undefined") {
//     return <StaticRouter location="/">{children}</StaticRouter>;
//   }

//   return (
//     <MemoryRouter initialEntries={["/"]} initialIndex={0}>
//       {children}
//     </MemoryRouter>
//   );
// }

// Router.propTypes = {
//   children: PropTypes.node,
// };

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}
const LeftNav = () => {
  const routeMatch = useRouteMatch(["/", "/map", "/saves"]);
  const currentTab = routeMatch?.pattern?.path;
  return (
    <LeftNavContainer>
      <div className="nav-img">
        <img src={logo} alt="logo" width={40} />
      </div>
      <Tabs value={currentTab} orientation="vertical">
        <Tab
          icon={<Dashboard />}
          label="Dashboard"
          value="/"
          to="/"
          component={Link}
        />
        <Tab
          icon={<Map />}
          label="Map"
          value="/map"
          to="/map"
          component={Link}
        />
        <Tab
          icon={<Star />}
          label="Saves"
          value="/saves"
          to="/saves"
          component={Link}
        />
      </Tabs>
    </LeftNavContainer>
  );
};

export default LeftNav;
