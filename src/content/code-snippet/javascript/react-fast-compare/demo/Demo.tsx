import { TestCode } from "../../../../../react/LiveCode";
import entryCode from "./index.test?raw";
import reactFastCompareCode from "./react-fast-compare?raw";

export default () => {
  return (
    <TestCode
      entryCode={entryCode}
      otherFiles={{
        "react-fast-compare.js": reactFastCompareCode,
      }}
      template="test-ts"
    />
  );
};
