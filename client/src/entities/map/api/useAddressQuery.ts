import { useMutation } from "react-query";
import axios from "axios";
import { mapbox } from "entities/map/model/const/mapConst";

export function useAddressQuery() {
  const { mutate, data, isLoading } = useMutation({
    mutationKey: ["get address"],
    mutationFn: async ({
      lng,
      lat,
    }: {
      lng: number;
      lat: number;
    }): Promise<string> => {
      const res = await axios.get<{
        features: { properties: { context: { address: { name: string } } } }[];
      }>(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${mapbox.accessToken}`,
      );

      return res.data.features[0].properties.context.address.name;
    },
  });

  return { mutate, data, isLoading };
}
