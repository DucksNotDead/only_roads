import { JSX, ReactNode, useContext, useEffect } from "react";
import { deviceContext } from "../model/const/deviceContext";

interface IProps {
  children: ReactNode;
}

export function BrowserView({ children }: IProps) {
  const { isMobile } = useContext(deviceContext);

  return (!isMobile ? children : null) as JSX.Element;
}
