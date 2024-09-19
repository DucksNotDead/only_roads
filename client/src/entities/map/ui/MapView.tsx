import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Styles from "./MapView.module.scss";
import {
  mapbox,
  mapContainerId,
  mapMinZoom,
  mapZoom,
} from "../model/const/mapConst";
import { useCurrentGeo } from "shared/lib/useCurrentGeo";
import { initMap } from "entities/map/config/initMap";
import { Skeleton } from "antd";
import { Map } from "lucide-react";

interface IProps {
  onMarkClick: (markId: number) => void;
}

export function MapView({ onMarkClick }: IProps) {
  const [renderPending, setRenderPending] = useState(false);
  const { getPosition } = useCurrentGeo();
  const boxRef = useRef<HTMLDivElement>(null);

  const handleMarkClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const id = Number(
        (target.tagName === "IMG" ? target.parentElement : target)?.dataset.id,
      );
      onMarkClick(id);
    },
    [onMarkClick],
  );

  useEffect(() => {
    setRenderPending(() => true);
    getPosition().then(({ coords: { latitude, longitude } }) => {
      const map = initMap([longitude, latitude]);

      map.on("load", () => {
        boxRef.current?.querySelector(".mapboxgl-ctrl-logo")?.remove();
        boxRef.current?.querySelector(".mapboxgl-ctrl-attrib")?.remove();

        setRenderPending(() => false);
        setTimeout(() => {
          map.flyTo({ zoom: mapZoom, center: [longitude, latitude] });
          map.setMinZoom(mapMinZoom);
        }, 500);
      });

      for (const i of [1, 2]) {
        const markEl = document.createElement("div");
        markEl.classList.add(Styles.MarkMarker);
        markEl.dataset.id = String(i);
        const image = document.createElement("img");
        image.src = "";
        markEl.append(image);

        markEl.addEventListener("click", handleMarkClick);

        new mapbox.Marker({ element: markEl })
          .setLngLat([longitude + i * 0.001, latitude + i * 0.001])
          .addTo(map);
      }

      const userEl = document.createElement("div");
      userEl.classList.add(Styles.UserMarker);

      new mapbox.Marker(userEl).setLngLat([longitude, latitude]).addTo(map);

      map.addControl(new mapbox.NavigationControl(), "bottom-right");

      map.addControl(
        new mapbox.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: false,
          showUserLocation: false,
          showAccuracyCircle: false,
        }),
      );
    });
  }, []);

  return (
    <div ref={boxRef} className={Styles.Main} id={mapContainerId}>
      {renderPending && (
        <Skeleton.Node active>
          <Map />
        </Skeleton.Node>
      )}
    </div>
  );
}
