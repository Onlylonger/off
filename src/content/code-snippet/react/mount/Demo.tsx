import LiveCode from "../../../../react/LiveCode";
import appCode from "./App?raw";
// import utilsCode from "./utils?raw";

export default () => {
  return (
    <LiveCode
      files={{
        // utils: utilsCode,
        "App.js": appCode,
      }}
    />
  );
};
