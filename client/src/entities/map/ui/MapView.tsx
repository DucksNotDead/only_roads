import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
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

export function MapView() {
  const [loadPending, setLoadPending] = useState(false);
  const { getPosition } = useCurrentGeo();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoadPending(() => true)
    getPosition().then(({ coords: { latitude, longitude } }) => {
      const map = initMap([longitude, latitude]);

      map.on("load", () => {
        boxRef.current?.querySelector(".mapboxgl-ctrl-logo")?.remove();
        boxRef.current?.querySelector(".mapboxgl-ctrl-attrib")?.remove();
        setLoadPending(() => false)
        setTimeout(() => {
          map.flyTo({ zoom: mapZoom });
          map.setMinZoom(mapMinZoom);
        }, 500)
      });

      const userEl = document.createElement("div");
      userEl.classList.add(Styles.UserMarker);

      const userElPulser = document.createElement("div");
      userElPulser.classList.add(Styles.UserMarkerPulser);

      userEl.append(userElPulser);

      const user = new mapbox.Marker({
        element: userEl,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);
    });
  }, []);

  return (
    <div ref={boxRef} className={Styles.Main} id={mapContainerId}>
      <Skeleton.Node active>
        <></>
      </Skeleton.Node>
    </div>
  );
}
