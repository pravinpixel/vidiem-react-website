import { useQuery, useMutation, useQueryClient } from "react-query";
import * as Product from "store/services/ProductServices";

export const useFetchProducts = () => {
    return useQuery("AllProducts", () => Product.FetchProducts(), {
        enabled: false,
        retry: false,
    });
}
export const useProductInfo = (productId) => {
    return useQuery(["ProductInfo", productId], () => Product.FetchProductInfo(productId), {
        enabled: false,
        retry: false,
    });
}
export const useCreateCustomization = () => {
    return useMutation((formData) => Product.CreateCustomization(formData));
}
export const useCurrentCustomization = (uuid) => {
    return useQuery(["CurrentCustomisation", uuid], () => Product.CurrentCustomization(uuid), {
        enabled: false,
        retry: false
    });
}
export const useUpdateCustomization = () => {
    const queryClient = useQueryClient();
    return useMutation((formData) => Product.UpdateCustomization(formData), {
        onSuccess: () => {
            queryClient.refetchQueries("CurrentCustomisation");
        },
    });
}
export const useClearCustomization = () => {
    return useMutation((productId) => Product.ClearCustomization(productId));
}
export const useSaveBuild = () => {
    return useMutation((formData) => Product.SaveBuild(formData));
}
