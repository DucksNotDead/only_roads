import { Button, Flex, Skeleton } from "antd";
import { AddPhotoPanel } from "feature/AddPhotoPanel";
import { HomePageHeader } from "./HomePageHeader";
import { useCallback, useEffect, useRef, useState } from "react";
import { MobileView } from "feature/DeviceProvider";
import { MapView } from "entities/map/ui/MapView";
import { IMarkDetailRef, MarkDetail } from "widgets/MarkDetail";
import { useAddressQuery } from "entities/map";
import { useCurrentGeo } from "shared/lib/useCurrentGeo";

import Styles from "./HomePage.module.scss";
import { MapPin } from "lucide-react";
import { IMark } from "entities/mark";

export function HomePage() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const markDetailRef = useRef<IMarkDetailRef>(null);
  const { getPosition } = useCurrentGeo();

  const {
    mutate: getAddress,
    data: address,
    isLoading: addressPending,
  } = useAddressQuery();

  const toggleCameraOpen = useCallback(() => {
    setIsCameraOpen((prevState) => !prevState);
  }, []);

  const handleCardClick = useCallback(
    (mark: IMark) => {
      markDetailRef.current?.open(mark);
    },
    [],
  );

  useEffect(() => {
    if (isCameraOpen) {
      setTimeout(() => {
        getPosition().then(({ coords: { longitude: lng, latitude: lat } }) => {
          getAddress({ lng, lat });
        });
      }, 500);
    }
  }, [isCameraOpen]);

  return (
    <Flex className={Styles.Main} vertical>
      <HomePageHeader />
      {isCameraOpen && <AddPhotoPanel onTakePhoto={console.log} />}
      <Flex className={Styles.Content} vertical>
        <MobileView>
          <Button type={"primary"} onClick={toggleCameraOpen}>
            {isCameraOpen ? "Закрыть камеру" : "Добавить фото"}
          </Button>
        </MobileView>
        {isCameraOpen &&
          (addressPending ? (
            <Skeleton active title={false} paragraph={{ rows: 2 }} />
          ) : (
            <Flex className={Styles.Address}>
              <MapPin />
              <p>{address}</p>
            </Flex>
          ))}
        <div style={{ display: isCameraOpen ? "none" : "block" }}>
          <MapView onMarkClick={handleCardClick} />
        </div>
        <MarkDetail ref={markDetailRef} />
      </Flex>
    </Flex>
  );
}
