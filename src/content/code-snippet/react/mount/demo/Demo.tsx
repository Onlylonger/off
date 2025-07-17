import LiveCode from "../../../../../react/LiveCode";
import appCode from "./App?raw";
import utilsCode from "./utils?raw";

export default () => {
  return (
    <LiveCode
      files={{
        "App.js": appCode,
        "utils.js": utilsCode,
      }}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
      }}
    />
  );
};
