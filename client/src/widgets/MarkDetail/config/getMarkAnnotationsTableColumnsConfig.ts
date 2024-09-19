import { ColumnType } from "antd/es/table";
import { IMarkAnnotation } from "entities/markAnnotation";
import { IDefectStatus } from "entities/defectStatus";
import { IDefect } from "entities/defect";

export const getMarkAnnotationsTableColumnsConfig = (
  statuses: IDefectStatus[],
  defects: IDefect[],
): ColumnType<IMarkAnnotation>[] => {
  const status = (id: number) => statuses.find((s) => s.id === id);
  const defect = (id: number) => defects.find((d) => d.id === id);

  return [
    {
      dataIndex: "id",
      title: "ID",
      render: (value) => "#" + value,
    },
    {
      dataIndex: "defect_id",
      title: "Дефект",
      render: (value) => defect(value)?.name ?? "",
    },
    {
      dataIndex: "defect_status_id",
      title: "Статус",
      render: (value) => status(value)?.name ?? "",
    },
  ];
};
