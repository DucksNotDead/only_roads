import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { IMarkDetailRef } from "widgets/MarkDetail";
import { Modal } from "antd";

export const MarkDetail = forwardRef<IMarkDetailRef>(({}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((id: number) => {
    setIsOpen(() => true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpen(() => false);
  }, []);

  useImperativeHandle(ref, () => ({ open }));

  return (
    <Modal closable={false} destroyOnClose open={isOpen} onCancel={handleCancel} centered>

    </Modal>
  );
});
