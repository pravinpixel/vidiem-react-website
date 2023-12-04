import { useMutation, useQuery, useQueryClient } from "react-query";

import * as Auth from "store/services/AuthServices";

export const useAuthLogin = () => {
    return useMutation((formData) => Auth.AuthLogin(formData));
}
export const useAuthRegister = () => {
    return useMutation((formData) => Auth.AuthRegister(formData));
}
export const useGuestRegister = () => {
    return useMutation((formData) => Auth.GuestRegister(formData));
}
export const useOtpGenerate = () => {
    return useMutation((formData) => Auth.OtpGenerate(formData));
}
export const useOtpLogin = () => {
    return useMutation((formData) => Auth.OtpLogin(formData));
}
export const useResendOtp = () => {
    return useMutation((formData) => Auth.ResendOtp(formData));
}
export const useAddAddress = () => {
    const queryClient = useQueryClient();
    return useMutation((formData) => Auth.AddAddress(formData), {
        onSuccess: () => {
            queryClient.refetchQueries("CurrentCustomisation");
        },
    });
}
export const useAddCoupon = () => {
    const queryClient = useQueryClient();
    return useMutation((formData) => Auth.AddCoupon(formData), {
        onSuccess: () => {
            queryClient.refetchQueries("CurrentCustomisation");
        },
    });
}
export const useTriggerPayment = () => {
    return useMutation((formData) => Auth.TriggerPayment(formData));
}
export const useTriggerPaymentSuccess = () => {
    return useMutation((formData) => Auth.TriggerPaymentSuccess(formData));
}
export const useLogout = () => {
    return useMutation(() => Auth.AuthLogout());
}
export const useMyProfile = () => {
    return useQuery("MyProfile", () => Auth.MyProfile(), {
        enabled: false,
        retry: false,
    });
}
export const useMyProfileUpdate = () => {
    return useMutation((formData) => Auth.MyProfileUpdate(formData));
}
export const useMyOrders = () => {
    return useQuery("MyOrders", () => Auth.MyOrders(), {
        enabled: false,
        retry: false,
    });
}
export const useMyCustomization = () => {
    return useQuery("MyCustomization", () => Auth.MyCustomization(), {
        enabled: false,
        retry: false,
    });
}
export const useForgotPassword = () => {
    return useMutation((formData) => Auth.ForgotPassword(formData));
}
