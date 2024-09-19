import { useMutation } from "react-query";
import axios from "axios";
import { mapbox } from "entities/map";

export function useAddressQuery(onSuccess?: (data: string) => void) {
  const { mutate, data, isLoading } = useMutation({
    onSuccess,
    mutationKey: ["get address"],
    mutationFn: async ({
      lng,
      lat,
    }: {
      lng: number;
      lat: number;
    }): Promise<string> => {
      const res = await axios.get<{
        features: {
          properties: {
            context: { address: { name: string }; place: { name: string } };
          };
        }[];
      }>(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${mapbox.accessToken}`,
      );
      const context = res?.data?.features[0]?.properties?.context;

      return context?.address
        ? context.address.name
        : context?.place
          ? context.place.name
          : "";
    },
  });

  return { mutate, data, isLoading };
}
