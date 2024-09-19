import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from "react";
import { IMarkDetailRef } from "widgets/MarkDetail";
import { Modal, Table } from "antd";
import { useMarkAnnotationQuery } from "entities/markAnnotation";
import { useDefectStatusQuery } from "entities/defectStatus";
import { useDefectQuery } from "entities/defect";
import { getMarkAnnotationsTableColumnsConfig } from "../config/getMarkAnnotationsTableColumnsConfig";
import { IMark } from "entities/mark";
import { useAddressQuery } from "entities/map";

export const MarkDetail = forwardRef<IMarkDetailRef>(({}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markDetail, setMarkDetail] = useState<null | Pick<
    IMark,
    "id" | "image"
  >>(null);

  const {
    mutate: getAddress,
    data: address,
    isLoading: addressPending,
  } = useAddressQuery(() => setIsOpen(() => true));

  const { data: defects, isLoading: defectsLoading } = useDefectQuery();

  const { data: statuses, isLoading: statusesLoading } = useDefectStatusQuery();

  const { data: annotations, isLoading: annotationLoading } =
    useMarkAnnotationQuery(markDetail?.id ?? undefined);

  const open = useCallback<IMarkDetailRef["open"]>(
    ({ id, image, longitude, latitude }) => {
      setMarkDetail(() => ({ id, image }));
      getAddress({ lng: longitude, lat: latitude });
    },
    [getAddress],
  );

  const handleCancel = useCallback(() => {
    setIsOpen(() => false);
    setMarkDetail(() => null);
  }, []);

  const title = useMemo(() => {
    return `${address} #${markDetail?.id}`;
  }, [markDetail?.id, address]);

  const columns = useMemo(() => {
    return getMarkAnnotationsTableColumnsConfig(
      statuses?.data ?? [],
      defects?.data ?? [],
    );
  }, [statuses, defects]);

  const data = useMemo(() => {
    return annotations?.data.map((a) => ({ ...a, key: a.id }));
  }, [annotations]);

  useImperativeHandle(ref, () => ({ open }));

  return (
    <Modal
      title={title}
      destroyOnClose
      open={isOpen}
      onCancel={handleCancel}
      centered
      styles={{ body: { maxHeight: 400, overflow: 'auto' }  }}
      footer={''}
    >
      <img src={markDetail?.image?.replace('http', 'https')} alt="mark detail" style={{ width: '100%' }} />
      <Table
        dataSource={data}
        columns={columns}
        loading={annotationLoading || defectsLoading || statusesLoading}
      />
    </Modal>
  );
});
