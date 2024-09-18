import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IDefect } from "../model/types/defectTypes";

export const useDefectQuery = () => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["defects"],
    queryFn: () =>
      axios.get<IDefect[]>("http://localhost:8000/api/v1/defects/"),
  });

  const { mutate } = useMutation({
    mutationKey: ["create defect"],
    onMutate: (data: IDefect) =>
      axios.post<IDefect>("http://localhost:8000/api/v1/defects/", data),
    onSuccess: () => client.invalidateQueries(["defects"]),
  });

  return { data, isLoading, mutate };
};
