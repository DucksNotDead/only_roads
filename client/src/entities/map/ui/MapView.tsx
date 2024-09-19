import "mapbox-gl/dist/mapbox-gl.css";

import { Skeleton } from "antd";
import { initMap } from "entities/map/config/initMap";
import { IMark, useMarkQuery } from "entities/mark";
import { Map } from "lucide-react";
import { Map as IMap } from "mapbox-gl/dist/mapbox-gl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCurrentGeo } from "shared/lib/useCurrentGeo";

import {
  mapbox,
  mapContainerId,
  mapMinZoom,
  mapZoom,
} from "../model/const/mapConst";
import Styles from "./MapView.module.scss";

interface IProps {
  onMarkClick: (markId: number) => void;
}

export function MapView({ onMarkClick }: IProps) {
  const [renderPending, setRenderPending] = useState(false);
  const { getPosition } = useCurrentGeo();
  const [isReady, setIsReady] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<IMap | null>(null);

  const { data, isLoading } = useMarkQuery();

  const marks = useMemo<IMark[]>(() => {
    return data?.data ?? [];
  }, [data]);

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

      mapRef.current = map;
      setIsReady(() => true);

      map.on("load", () => {
        boxRef.current?.querySelector(".mapboxgl-ctrl-logo")?.remove();
        boxRef.current?.querySelector(".mapboxgl-ctrl-attrib")?.remove();

        setRenderPending(() => false);
        setTimeout(() => {
          map.flyTo({ zoom: mapZoom, center: [longitude, latitude] });
          map.setMinZoom(mapMinZoom);
        }, 500);
      });

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

  useEffect(() => {
    if (marks.length && mapRef.current && isReady) {
      for (const mark of marks) {
        const markEl = document.createElement("div");
        markEl.classList.add(Styles.MarkMarker);
        markEl.dataset.id = String(mark.id);
        const image = document.createElement("img");
        image.src = mark.image.replace("http", "https");
        console.log(image.src);

        markEl.append(image);

        markEl.addEventListener("click", handleMarkClick);

        new mapbox.Marker({ element: markEl })
          .setLngLat([mark.longitude, mark.latitude])
          .addTo(mapRef.current);
      }
    }
  }, [marks, isReady]);

  return (
    <div ref={boxRef} className={Styles.Main} id={mapContainerId}>
      {(renderPending || isLoading) && (
        <Skeleton.Node active>
          <Map />
        </Skeleton.Node>
      )}
    </div>
  );
}
