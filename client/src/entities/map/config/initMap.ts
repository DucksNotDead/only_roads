import { mapbox, mapZoom, mapContainerId, mapMinZoom } from "../model/const/mapConst";

export const initMap = (userCoords: [number, number]) =>
  new mapbox.Map({
    container: mapContainerId,
    style: "mapbox://styles/mapbox/streets-v12",
    center: userCoords,
    zoom: 5,
    language: "ru_RU"
  });
