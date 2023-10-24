import { Rohlik } from "../components/Rohlik";
import { render } from "./render";
import { HashRouter as Router } from "react-router-dom";

// TODO: It looks that if we bootstrap the app too fast, the original client gets confused because hydration doesn't match.
setTimeout(() => {
  render(
    <Router>
      <Rohlik />
    </Router>
  );
}, 500);
