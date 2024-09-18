import { ReactNode } from "react";
import { App, ConfigProvider, theme } from "antd";
import { themeConfig } from "../theme/antThemeConfig";

interface IProps {
  children: ReactNode;
}

export function AntDProvider({ children }: IProps) {
  return (
    <App>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </App>
  );
}
