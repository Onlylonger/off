import { TestCode } from "../../../../../react/LiveCode";
import entryCode from "./index.test?raw";
import cvaCode from "./cva?raw";
import classnamesCode from "../../classnames/demo/classnames?raw";

export default () => {
  return (
    <TestCode
      entryCode={entryCode}
      otherFiles={{
        "classnames.js": classnamesCode,
        "cva.js": cvaCode,
      }}
      template="test-ts"
    />
  );
};
