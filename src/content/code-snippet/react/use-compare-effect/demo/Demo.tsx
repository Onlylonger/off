import LiveCode from "../../../../../react/LiveCode";
import appCode from "./App?raw";
import useCompareEffectCode from "./use-compare-effect?raw";
import usePreviousCode from "../../use-previous/demo/use-previous?raw";
import reactFastCompareCode from "../../../javascript/react-fast-compare/demo/react-fast-compare?raw";

export default () => {
  return (
    <LiveCode
      files={{
        "App.js": appCode,
        "use-compare-effect.js": useCompareEffectCode,
        "react-fast-compare.js": reactFastCompareCode,
        "use-previous.js": usePreviousCode,
      }}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
        showConsole: true,
      }}
    />
  );
};
