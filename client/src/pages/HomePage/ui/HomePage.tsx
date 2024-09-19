import { Button, Flex, Skeleton, Spin } from "antd";
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
import { IMark, useMarkQuery } from "entities/mark";

export function HomePage() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);
  const markDetailRef = useRef<IMarkDetailRef>(null);
  const { getPosition } = useCurrentGeo();

  const {
    mutate: getAddress,
    data: address,
    isLoading: addressPending,
  } = useAddressQuery();

  const { mutate: createMark, isCreateLoading } = useMarkQuery(() => {
    setIsCameraOpen(() => false);
  });

  const handleTakePhoto = useCallback(
    (file: File) => {
      if (currentPosition) {
        const fd = new FormData()
        fd.append('image', file)
        fd.append('longitude', currentPosition[0].toString())
        fd.append('latitude', currentPosition[1].toString())
        createMark(fd)
      }
    },
    [currentPosition, createMark],
  );

  const toggleCameraOpen = useCallback(() => {
    setIsCameraOpen((prevState) => !prevState);
  }, []);

  const handleCardClick = useCallback((mark: IMark) => {
    markDetailRef.current?.open(mark);
  }, []);

  useEffect(() => {
    getPosition().then(({ coords: { longitude: lng, latitude: lat } }) => {
      setCurrentPosition(() => [lng, lat]);
      getAddress({ lng, lat });
    });
  }, [isCameraOpen]);

  return (
    <Flex className={Styles.Main} vertical>
      <HomePageHeader />
      {isCreateLoading ? (
        <Spin />
      ) : (
        <>
          {isCameraOpen && <AddPhotoPanel onTakePhoto={handleTakePhoto} />}
          <Flex className={Styles.Content} vertical>
            <MobileView>
              <Button type={"primary"} onClick={toggleCameraOpen}>
                {isCameraOpen ? "Закрыть камеру" : "Добавить фото"}
              </Button>
            </MobileView>
            {isCameraOpen && (
              <Flex className={Styles.Address}>
                <MapPin />
                <p>{address}</p>
              </Flex>
            )}
            <div style={{ display: isCameraOpen ? "none" : "block" }}>
              <MapView
                onMarkClick={handleCardClick}
                currentPosition={currentPosition}
              />
            </div>
            <MarkDetail ref={markDetailRef} />
          </Flex>
        </>
      )}
    </Flex>
  );
}
