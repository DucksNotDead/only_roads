import { DeviceProvider } from "./providers/DeviceProvider";
import { AntDProvider } from "./providers/AntDProvider";
import { HomePage } from "../pages/HomePage";
import { PageProvider } from "./providers/PageProvider";
import "./theme/normalize.css";
import "./theme/index.css";

export function App() {
  return (
    <DeviceProvider>
      <AntDProvider>
        <PageProvider>
          <HomePage />
        </PageProvider>
      </AntDProvider>
    </DeviceProvider>
  );
}
