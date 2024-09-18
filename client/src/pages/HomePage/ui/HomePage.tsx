import { Button, Flex, Skeleton } from "antd";
import { AddPhotoPanel } from "feature/AddPhotoPanel";
import { HomePageHeader } from "./HomePageHeader";
import { useCallback, useState } from "react";
import { MobileView } from "../../../feature/DeviceProvider";
import { MapView } from "entities/map/ui/MapView";

export function HomePage() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [addressPending, setAddressPending] = useState(true);

  const toggleCameraOpen = useCallback(() => {
    setIsCameraOpen((prevState) => !prevState);
  }, []);

  return (
    <Flex style={{ height: "100%" }} vertical>
      <HomePageHeader />
      {isCameraOpen && <AddPhotoPanel onTakePhoto={console.log} />}
      <Flex style={{ padding: 12 }} vertical gap={12}>
        <MobileView>
          <Button type={"primary"} onClick={toggleCameraOpen}>
            {isCameraOpen ? "Закрыть камеру" : "Добавить фото"}
          </Button>
        </MobileView>
        {isCameraOpen &&
          (addressPending ? (
            <Skeleton active title={false} paragraph={{ rows: 2 }} />
          ) : (
            <span>Some address...</span>
          ))}
        <div style={{ display: isCameraOpen? 'none' : 'block' }}>
          <MapView/>
        </div>
      </Flex>
    </Flex>
  );
}
