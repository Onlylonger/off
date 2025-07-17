import { TestCode } from "../../../../../react/LiveCode";
import entryCode from "./index.test?raw";
import classnamesCode from "./classnames?raw";

export default () => {
  return (
    <TestCode
      entryCode={entryCode}
      otherFiles={{
        "classnames.js": classnamesCode,
      }}
      template="test-ts"
    />
  );
};
