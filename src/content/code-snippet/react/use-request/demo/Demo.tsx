import LiveCode from "../../../../../react/LiveCode";
import appCode from "./App?raw";
import apiCode from "./api?raw";
import fetcherCode from "./fetcher?raw";
import useRequestCode from "./use-request?raw";

export default () => {
  return (
    <LiveCode
      files={{
        "App.js": appCode,
        "use-request.js": useRequestCode,
        "fetcher.js": fetcherCode,
        "api.js": apiCode,
      }}
      options={{
        showConsole: true,
      }}
    />
  );
};
