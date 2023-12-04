import VidiemServer from "helpers/AxiosConfig";

const AuthLogin = async (formData) => {
    const { data } = await VidiemServer.post(`/login`, formData);
    return data;
}
const OtpGenerate = async (formData) => {
    const { data } = await VidiemServer.post(`/generate-otp`, formData);
    return data;
}
const OtpLogin = async (formData) => {
    const { data } = await VidiemServer.post(`/otp-login`, formData);
    return data;
}
const ResendOtp = async (formData) => {
    const { data } = await VidiemServer.post(`/resend-otp`, formData);
    return data;
}
const AddAddress = async (formData) => {
    const { data } = await VidiemServer.post(`/update-billing-shipping`, formData);
    return data;
}
const AddCoupon = async (formData) => {
    // let customHeader = {
    //     uuid: "dsysdvgsdgsdv"
    // }
    // const { data } = await VidiemServer.post(`/coupon`, formData, {
    //     headers: customHeader
    // });
    // return data;

    const { data } = await VidiemServer.post(`/coupon`, formData);
    return data;
}
const TriggerPayment = async (formData) => {
    const { data } = await VidiemServer.post(`/razor-pay-generate-token`, formData);
    return data;
}
const TriggerPaymentSuccess = async (formData) => {
    const { data } = await VidiemServer.post(`/razor-pay-order-success`, formData);
    return data;
}
const AuthRegister = async (formData) => {
    const { data } = await VidiemServer.post(`/register`, formData);
    return data;
}
const GuestRegister = async (formData) => {
    const { data } = await VidiemServer.post(`/guest-checkout`, formData);
    return data;
}
const AuthLogout = async () => {
    const { data } = await VidiemServer.post(`/logout`);
    return data;
}
const MyProfile = async () => {
    const { data } = await VidiemServer.get(`/my-profile`);
    return data;
}
const MyProfileUpdate = async (formData) => {
    const { data } = await VidiemServer.post(`/update-profile`, formData);
    return data;
}
const MyOrders = async () => {
    const { data } = await VidiemServer.post(`/my-orders`);
    return data;
}
const MyCustomization = async () => {
    const { data } = await VidiemServer.post(`/my-customizations`);
    return data;
}
const ForgotPassword = async (formData) => {
    const { data } = await VidiemServer.post(`/forgot-password`, formData);
    return data;
}

export {
    AuthLogin,
    OtpGenerate,
    OtpLogin,
    ResendOtp,
    AddAddress,
    AddCoupon,
    TriggerPayment,
    TriggerPaymentSuccess,
    AuthRegister,
    GuestRegister,
    AuthLogout,
    MyProfile,
    MyProfileUpdate,
    MyOrders,
    MyCustomization,
    ForgotPassword
}
