import LiveCode from "../../../../../react/LiveCode";
import appCode from "./App?raw";
import ButtonCode from "./Button?raw";
import cvaCode from "../../../javascript/class-variance-authority/demo/cva?raw";
import classnamesCode from "../../../javascript/classnames/demo/classnames?raw";

export default () => {
  return (
    <LiveCode
      files={{
        "Button.jsx": ButtonCode,
        "cva.js": cvaCode,
        "classnames.js": classnamesCode,
        "App.js": appCode,
      }}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
      }}
    />
  );
};
