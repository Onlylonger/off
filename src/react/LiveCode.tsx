import {
  type Sandpack,
  type SandpackFiles,
  type SandpackProps,
} from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";

export default function LiveCode(props: SandpackProps) {
  const [Component, setComponent] = useState<typeof Sandpack | null>(null);

  useEffect(() => {
    import("@codesandbox/sandpack-react").then((res) => {
      setComponent(() => res.Sandpack);
    });
  }, []);

  if (!Component) return "loading...";

  return (
    <div className="no-prose">
      <Component theme="light" template="react" {...props} />
    </div>
  );
}

export const TestCode = (
  props: {
    entryCode: string;
    otherFiles: SandpackFiles;
  } & Omit<SandpackProps, "files">,
) => {
  const { entryCode, otherFiles = {}, ...reset } = props;

  return (
    <LiveCode
      files={{
        ...otherFiles,
        "index.test.js": {
          active: true,
          code: entryCode,
        },
        "add.test.ts": {
          hidden: true,
          code: "",
          active: false,
        },
      }}
      template="test-ts"
      {...reset}
    />
  );
};
