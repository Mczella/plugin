import { Rohlik } from "../components/Rohlik";
import { render } from "./render";
import { HashRouter as Router } from "react-router-dom";

setTimeout(() => {
  render(
    <Router>
      <Rohlik />
    </Router>
  );
}, 2000);
