import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IMark } from "../model/types/markTypes";
import { App } from "antd";

export const useMarkQuery = (
  onFinally?: () => void,
  onSuccess?: (mark: IMark) => void,
) => {
  const client = useQueryClient();
  const { message } = App.useApp();

  const { data, isLoading } = useQuery({
    queryKey: ["marks"],
    queryFn: () =>
      axios.get<IMark[]>(`${process.env.REACT_APP_URL_API}/api/v1/marks/`),
  });

  const { mutate, isLoading: isCreateLoading } = useMutation({
    mutationKey: ["create mark"],
    onMutate: async (data: FormData) => {
      const res = await axios.post<IMark>(
        `${process.env.REACT_APP_URL_API}/api/v1/marks/`,
        data,
      );
      void message.success("Фотография успешно загружена");
      void client.invalidateQueries(["marks"]);
      onSuccess?.(res.data);
      onFinally?.()
    },
  });

  return { data, isLoading, isCreateLoading, mutate };
};
