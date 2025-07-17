import { TestCode } from "../../../../../react/LiveCode";
import entryCode from "./index.test?raw";
import copyToClipboardCode from "./copy-to-clipboard?raw";

export default () => {
  return (
    <TestCode
      entryCode={entryCode}
      otherFiles={{
        "copy-to-clipboard.js": copyToClipboardCode,
      }}
      template="test-ts"
    />
  );
};
