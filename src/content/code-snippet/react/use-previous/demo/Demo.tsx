import LiveCode from "../../../../../react/LiveCode";
import appCode from "./App?raw";
import usePreviousCode from "./use-previous?raw";

export default () => {
  return (
    <LiveCode
      files={{
        "App.js": appCode,
        "use-previous.js": usePreviousCode,
      }}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
      }}
    />
  );
};
