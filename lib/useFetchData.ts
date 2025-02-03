import { useQuery } from "@tanstack/react-query";

const useFetchData = (url:string, queryKey:Array<string>) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await fetch(url);
      return await response.json();
    },
  });
  return { isPending, error, data, isFetching };
};

export default useFetchData;
