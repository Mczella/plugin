import { Rohlik } from "../components/Rohlik";
import { GlobalStateProvider } from "../components/store/StoreProvider.tsx";
import { render } from "./render";
import { HashRouter as Router } from "react-router-dom";

if (document.location.pathname === "/") {
  document.location = "https://www.rohlik.cz/me-oblibene#/";
}

setTimeout(() => {
  render(
    <GlobalStateProvider>
      <Router>
        <Rohlik />
      </Router>
    </GlobalStateProvider>,
  );
}, 1000);
