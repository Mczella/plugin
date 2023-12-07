import { Rohlik } from "../components/Rohlik";
import { GlobalStateProvider } from "../components/store/StoreProvider.tsx";
import { render } from "./render";
import { HashRouter as Router } from "react-router-dom";

setTimeout(() => {
  render(
    <GlobalStateProvider>
      <Router>
        <Rohlik />
      </Router>
    </GlobalStateProvider>,
  );
}, 1000);

const injectScript = (file: string, node: string) => {
  console.log("script injected");
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.setAttribute("src", file);
  th.appendChild(s);
};

injectScript(chrome.runtime.getURL("/src/web.js"), "body");
