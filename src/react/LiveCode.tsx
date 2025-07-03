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
    <Component
      theme="light"
      template="react"
      {...props}
      options={{
        initMode: "immediate",
        externalResources: ["https://cdn.tailwindcss.com"],
        classes: {
          "sp-wrapper": "no-prose",
        },
      }}
    />
  );
}
