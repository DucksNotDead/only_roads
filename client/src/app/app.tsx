import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { DeviceProvider } from "./providers/DeviceProvider";
import { AntDProvider } from "./providers/AntDProvider";
import { HomePage } from "../pages/HomePage";
import { PageProvider } from "./providers/PageProvider";
import "./theme/normalize.css";
import "./theme/index.css";

const client = new QueryClient();
export function App() {
  return (
    <QueryClientProvider client={client}>
      <DeviceProvider>
        <AntDProvider>
          <PageProvider>
            <HomePage />
          </PageProvider>
        </AntDProvider>
      </DeviceProvider>
    </QueryClientProvider>
  );
}
