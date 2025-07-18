import LiveCode from "../../../../react/LiveCode";
import appCode from "./App?raw";
import utilsCode from "./utils?raw";

export default () => {
  return (
    <LiveCode
      files={{
        "utils.js": utilsCode,
        "App.js": appCode,
      }}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
      }}
    />
  );
};
