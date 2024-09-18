import { ReactNode } from "react";
import { Flex } from "antd";
import Styles from "./PageProvider.module.scss";

interface IProps {
  children: ReactNode;
}

export function PageProvider({ children }: IProps) {
  return (
    <Flex className={Styles.Main} justify={"center"}>
      <div className={Styles.Wrapper}>
        {children}
      </div>
    </Flex>
  );
}
