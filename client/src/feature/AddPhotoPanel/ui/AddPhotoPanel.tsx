import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import { Spin } from "antd";

import Styles from "./AddPhotoPanel.module.scss";
import "react-html5-camera-photo/build/css/index.css";
import { useCallback } from "react";

interface IProps {
  onTakePhoto: (file: File) => void;
}

export function AddPhotoPanel({ onTakePhoto }: IProps) {
  const handleTakePhoto = useCallback(
    (base64: string) => {
      let arr = base64.split(","),
        mime = arr[0]?.match(/:(.*?);/)?.[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], Date.now().toString() + "." + mime?.split('/')[1], {
        type: mime,
      });
      onTakePhoto(file);
    },
    [onTakePhoto],
  );

  return (
    <div className={Styles.CameraView}>
      <Spin />
      <Camera
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        onTakePhoto={handleTakePhoto}
        imageType={IMAGE_TYPES.JPG}
        isImageMirror
      />
    </div>
  );
}
