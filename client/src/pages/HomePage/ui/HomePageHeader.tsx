import { Button, Flex, Space } from "antd";
import Styles from "./HomePageHeader.module.scss";
import { BrowserView } from "feature/DeviceProvider";

export function HomePageHeader() {
  return (
    <Flex className={Styles.Main} align={"center"} justify={"space-between"}>
      <Flex gap={"small"} align={"center"}>
        <img src={"logo.svg"} alt={"app logo"} />
        <Flex vertical>
          <h1>ПростоДороги</h1>
          <p>{process.env.REACT_APP_DESCRIPTION}</p>
        </Flex>
      </Flex>
      <BrowserView>
        <Button className={Styles.LoginButtton} type={"link"}>Войти</Button>
      </BrowserView>
    </Flex>
  );
}
