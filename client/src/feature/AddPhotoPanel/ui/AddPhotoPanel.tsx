import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";
import { Spin } from "antd";

import Styles from "./AddPhotoPanel.module.scss";
import "react-html5-camera-photo/build/css/index.css";

interface IProps {
  onTakePhoto: (data: any) => void;
}

export function AddPhotoPanel({ onTakePhoto }: IProps) {
  return (
    <div className={Styles.CameraView}>
      <Spin />
      <Camera
        onTakePhoto={onTakePhoto}
        imageType={IMAGE_TYPES.JPG}
        isImageMirror
      />
    </div>
  );
}
