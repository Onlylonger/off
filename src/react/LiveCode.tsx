import { type Sandpack, type SandpackProps } from "@codesandbox/sandpack-react";
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
