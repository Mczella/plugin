import { Rohlik } from "../components/Rohlik";
import { GlobalStateProvider } from "../components/StoreProvider";
import { render } from "./render";
import { HashRouter as Router } from "react-router-dom";

render(
  <GlobalStateProvider>
    <Router>
      <Rohlik />
    </Router>
  </GlobalStateProvider>
);
