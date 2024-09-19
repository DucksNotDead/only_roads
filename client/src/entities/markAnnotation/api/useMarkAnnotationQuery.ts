import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IMarkAnnotation } from "../model/types/markAnnotationTypes";

export const useMarkAnnotationQuery = (mark_id?: string) => {
  const client = useQueryClient();

  const filter = mark_id ? `?mark_id=${mark_id}` : "";

  const { data, isLoading } = useQuery({
    queryKey: ["mark annotations"],
    queryFn: () =>
      axios.get<IMarkAnnotation[]>(
        `${process.env.REACT_APP_URL_API}/api/v1/mark-annotations/${filter}`,
      ),
  });

  const { mutate: createMutate } = useMutation({
    mutationKey: ["create mark annotation"],
    onMutate: (data: IMarkAnnotation) =>
      axios.post<IMarkAnnotation>(
        `${process.env.REACT_APP_URL_API}/api/v1/mark-annotations/`,
        data,
      ),
    onSuccess: () => client.invalidateQueries(["mark annotations"]),
  });

  const { mutate: updateMutate } = useMutation({
    mutationKey: ["update mark annotation"],
    onMutate: (data: Partial<IMarkAnnotation>) =>
      axios.patch<Partial<IMarkAnnotation>>(
        `${process.env.REACT_APP_URL_API}/api/v1/mark-annotations/`,
        data,
      ),
    onSuccess: () => client.invalidateQueries(["mark annotations"]),
  });

  return { data, isLoading, createMutate, updateMutate };
};
