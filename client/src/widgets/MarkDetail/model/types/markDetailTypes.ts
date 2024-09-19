import { IMark } from "entities/mark";

export interface IMarkDetailRef {
  open: (mark: IMark) => void;
}
