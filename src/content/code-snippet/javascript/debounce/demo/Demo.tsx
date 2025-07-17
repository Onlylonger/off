import { TestCode } from "../../../../../react/LiveCode";
import entryCode from "./index.test?raw";
import debounceCode from "./debounce?raw";

export default () => {
  return (
    <TestCode
      entryCode={entryCode}
      otherFiles={{
        "debounce.js": debounceCode,
      }}
      template="test-ts"
      options={{
        showConsole: true,
        bundlerURL: "https://sandpack-bundler.codesandbox.io",
      }}
    />
  );
};
