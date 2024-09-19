import { ReactNode } from "react";
import { App, ConfigProvider, theme } from "antd";
import { themeConfig } from "../theme/antThemeConfig";
import ru_RU from "antd/locale/ru_RU";

interface IProps {
  children: ReactNode;
}

export function AntDProvider({ children }: IProps) {
  return (
    <App>
      <ConfigProvider locale={ru_RU} theme={themeConfig}>
        {children}
      </ConfigProvider>
    </App>
  );
}
