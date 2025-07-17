import { TestCode } from "../../../../../react/LiveCode";
import entryCode from "./index.test?raw";
import capitalizeFirstLetterCode from "./capitalize-first-letter?raw";

export default () => {
  return (
    <TestCode
      entryCode={entryCode}
      otherFiles={{
        "capitalize-first-letter.js": capitalizeFirstLetterCode,
      }}
      template="test-ts"
    />
  );
};
