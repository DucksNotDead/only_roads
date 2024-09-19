import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IMark } from "../model/types/markTypes";
import { App } from "antd";

export const useMarkQuery = (onFinally?: () => void) => {
  const client = useQueryClient();
  const { message } = App.useApp();

  const { data, isLoading } = useQuery({
    queryKey: ["marks"],
    queryFn: () =>
      axios.get<IMark[]>(`${process.env.REACT_APP_URL_API}/api/v1/marks/`),
  });

  const { mutate, isLoading: isCreateLoading } = useMutation({
    mutationKey: ["create mark"],
    onMutate: (
      data: FormData,
    ) =>
      axios.post<IMark>(`${process.env.REACT_APP_URL_API}/api/v1/marks/`, data),
    onSuccess: () => {
      void client.invalidateQueries(["marks"]);
      onFinally?.();
    },
    onError: () => void message.error("Не удалось загрузить фотографию"),
  });

  return { data, isLoading, isCreateLoading, mutate };
};
