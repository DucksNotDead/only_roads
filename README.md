# Only Roads

Клиентское приложение сервиса Only Roads: фиксация дефектов дорожного покрытия на карте с фото и геолокацией.

## Возможности

- Карта (Mapbox) с отметками дефектов
- Съёмка фото с камеры устройства
- Детальная карточка отметки и аннотации
- Адаптация под мобильный и desktop

## Стек

- React / TypeScript (Create React App)
- Ant Design, Framer Motion
- Mapbox GL
- React Query, Axios
- Feature-Sliced Design (`entities` / `feature` / `widgets` / `pages`)

## Структура

```
client/          # основное приложение
  src/
    entities/    # defect, mark, map, ...
    feature/     # AddPhotoPanel, DeviceProvider, ...
    widgets/     # MarkDetail
    pages/       # HomePage
```

## Запуск

```bash
cd client
npm i
npm start
```

Ветка по умолчанию: `dev`.
