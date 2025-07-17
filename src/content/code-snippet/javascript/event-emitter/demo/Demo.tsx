import LiveCode from "../../../../../react/LiveCode";
import appCode from "./App?raw";
import createEventEmitterCode from "./create-event-emitter?raw";

export default () => {
  return (
    <LiveCode
      files={{
        "create-event-emitter.js": createEventEmitterCode,
        "App.js": appCode,
      }}
      options={{
        showConsole: true,
      }}
    />
  );
};
