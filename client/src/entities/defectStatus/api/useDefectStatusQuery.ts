import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IDefectStatus } from "../model/types/defectStatusTypes";

export const useDefectStatusQuery = () => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["defect statuses"],
    queryFn: () =>
      axios.get<IDefectStatus[]>(
        `${process.env.REACT_APP_URL_API}/api/v1/defect-statuses/`,
      ),
  });

  const { mutate } = useMutation({
    mutationKey: ["create defect status"],
    onMutate: (data: IDefectStatus) =>
      axios.post<IDefectStatus>(
        `${process.env.REACT_APP_URL_API}/api/v1/defect-statuses/`,
        data,
      ),
    onSuccess: () => client.invalidateQueries(["defect statuses"]),
  });

  return { data, isLoading, mutate };
};
