import "mapbox-gl/dist/mapbox-gl.css";

import { Skeleton } from "antd";
import { initMap } from "entities/map/config/initMap";
import { IMark, useMarkQuery } from "entities/mark";
import { Map } from "lucide-react";
import { Map as IMap } from "mapbox-gl/dist/mapbox-gl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  mapbox,
  mapContainerId,
  mapMinZoom,
  mapZoom,
} from "../model/const/mapConst";
import Styles from "./MapView.module.scss";

interface IProps {
  onMarkClick: (mark: IMark) => void;
  currentPosition: [number, number] | null;
}

export function MapView({ onMarkClick, currentPosition }: IProps) {
  const [renderPending, setRenderPending] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<IMap | null>(null);
  const prevData = useRef<number | null>(null);

  const { data, isLoading } = useMarkQuery();

  const marks = useMemo<IMark[]>(() => {
    return data?.data ?? [];
  }, [data]);

  const handleMarkClick = useCallback(
    (e: any) => {
      const target = e.target as HTMLElement;
      const id = Number(
        (target.tagName === "IMG"
          ? target.parentElement?.parentElement
          : target.tagName === "OBJECT"
            ? target.parentElement
            : target
        )?.dataset.id,
      );
      onMarkClick(marks.find((m) => m.id === id)!);
    },
    [onMarkClick, marks],
  );

  useEffect(() => {
    setRenderPending(() => true);
    if (currentPosition) {
      const map = initMap(currentPosition);

      mapRef.current = map;
      setIsReady(() => true);

      map.on("load", () => {
        boxRef.current?.querySelector(".mapboxgl-ctrl-logo")?.remove();
        boxRef.current?.querySelector(".mapboxgl-ctrl-attrib")?.remove();

        setRenderPending(() => false);
        setTimeout(() => {
          map.flyTo({ zoom: mapZoom, center: currentPosition });
          map.setMinZoom(mapMinZoom);
        }, 500);
      });

      const userEl = document.createElement("div");
      userEl.classList.add(Styles.UserMarker);

      new mapbox.Marker(userEl).setLngLat(currentPosition).addTo(map);

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
    }
  }, [currentPosition]);

  useEffect(() => {
    if (marks.length && isReady) {
      for (const mark of marks) {
        const markEl = document.createElement("div");
        markEl.classList.add(Styles.MarkMarker);
        markEl.dataset.id = String(mark.id);
        const image = document.createElement("object");
        image.data = mark.image.replace("http", "https");
        image.type = "image/jpg";
        const fallback = document.createElement("img");
        fallback.src = "fallback.svg";
        fallback.style.width = "20px";
        fallback.style.height = "20px";
        fallback.style.margin = "2px";

        image.append(fallback);
        markEl.append(image);

        markEl.addEventListener("click", handleMarkClick);
        markEl.addEventListener("touchend", handleMarkClick);

        new mapbox.Marker({ element: markEl })
          .setLngLat([mark.longitude, mark.latitude])
          .addTo(mapRef.current!);
      }
    }
  }, [marks, isReady, handleMarkClick]);

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
