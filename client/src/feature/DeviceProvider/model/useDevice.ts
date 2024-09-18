import { useContext } from "react";
import { deviceContext } from "./const/deviceContext";

export function useDevice() {
  return useContext(deviceContext);
}
