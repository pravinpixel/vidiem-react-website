import { useMutation, useQuery, useQueryClient } from "react-query";
import * as Web from "store/services/WebServices";

export const useBodyStyles = () => {
    return useQuery("BodyStyles", () => Web.FetchBodyStyles(), {
        enabled: false,
        retry: false
    });
}
export const useColors = (bodyId) => {
    return useQuery(["Colors", bodyId], () => Web.FetchColors(bodyId), {
        enabled: false,
        retry: false
    });
}
export const useMotors = (bodyId) => {
    return useQuery(["Motors", bodyId], () => Web.FetchMotors(bodyId), {
        enabled: false,
        retry: false
    });
}
export const useJarStyles = (uuid) => {
    return useQuery(["JarStyles", uuid], () => Web.FetchJarStyles(uuid), {
        enabled: false,
        retry: false
    });
}
export const useJarProperties = (categoryId) => {
    return useQuery(["JarProperties", categoryId], () => Web.FetchJarProperties(categoryId), {
        enabled: categoryId ? true : false,
        retry: false,
        refetchOnWindowFocus: false,
        retryOnMount: false
    });
}
export const useResetJarProperties = () => {
    const queryClient = useQueryClient();
    return useMutation((formData) => Web.ResetJarProperties(formData), {
        onSuccess: () => {
            queryClient.refetchQueries('CurrentCustomisation');
        }
    });
}
export const useCustomisedJars = (qs) => {
    return useQuery(["JarCustomisedList", qs], () => Web.FetchJarCustomised(qs), {
        enabled: false,
        retry: false
    });
}
export const useJarPreferences = (productId, jarId) => {
    return useQuery(["JarPreferences", productId], () => Web.FetchJarPreferences(productId, jarId), {
        enabled: false,
        retry: false
    });
}
export const useJarDetails = (jarId) => {
    return useQuery(["JarDetails", jarId], () => Web.FetchJarDetails(jarId), {
        enabled: false,
        retry: false
    });
}
export const usePreviewCoordinates = (baseId) => {
    return useQuery(["PreviewCoordinates", baseId], () => Web.PreviewCoordinates(baseId), {
        enabled: false,
        retry: false
    });
}
export const useMyOrders = () => {
    return useQuery("MyOrderList", () => Web.MyOrders(), {
        enabled: false,
        retry: false
    });
}
export const useMyCustomizations = () => {
    return useQuery("MyCustomizationList", () => Web.MyCustomizations(), {
        enabled: false,
        retry: false
    });
}
export const usePackingInfo = () => {
    return useQuery("PackingInfo", () => Web.FetchPackingInfo(), {
        enabled: false,
        retry: false
    });
}
