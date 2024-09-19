import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IMark } from "../model/types/markTypes";

export const useMarkQuery = () => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["marks"],
    queryFn: () =>
      axios.get<IMark[]>(`${process.env.REACT_APP_URL_API}/api/v1/marks/`),
  });

  const { mutate, isLoading: isCreateLoading } = useMutation({
    mutationKey: ["create mark"],
    onMutate: (data: IMark) =>
      axios.post<IMark>(`${process.env.REACT_APP_URL_API}/api/v1/marks/`, data),
    onSuccess: () => client.invalidateQueries(["marks"]),
  });

  return { data, isLoading, isCreateLoading, mutate };
};
