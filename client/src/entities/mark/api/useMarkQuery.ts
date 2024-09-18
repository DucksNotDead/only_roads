import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IMark } from "../model/types/markTypes";

export const useMarkQuery = () => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["marks"],
    queryFn: () => axios.get<IMark[]>("http://localhost:8000/api/v1/marks/"),
  });

  const { mutate } = useMutation({
    mutationKey: ["create mark"],
    onMutate: (data: IMark) =>
      axios.post<IMark>("http://localhost:8000/api/v1/marks/", data),
    onSuccess: () => client.invalidateQueries(["marks"]),
  });

  return { data, isLoading, mutate };
};
