import { createContext } from "react";

export const deviceContext = createContext<{ isMobile: boolean }>({
  isMobile: false,
});