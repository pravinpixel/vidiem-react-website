import VidiemServer from "helpers/AxiosConfig";

const FetchProducts = async () => {
    const { data } = await VidiemServer.get(`/products?limit=5`);
    return data;
}
const FetchProductInfo = async (productId) => {
    const { data } = await VidiemServer.get(`/product/${productId}`);
    return data;
}
const CreateCustomization = async (formData) => {
    const { data } = await VidiemServer.post(`/start-customisation`, formData);
    return data;
}
const CurrentCustomization = async (uuid) => {
    const { data } = await VidiemServer.get(`/selected-customisation?uuid=${uuid}`);
    return data;
}
const UpdateCustomization = async (formData) => {
    const { data } = await VidiemServer.post(`/update-customisation`, formData);
    return data;
}
const ClearCustomization = async (productId) => {
    const { data } = await VidiemServer.get(`/products/${productId}`);
    return data;
}
const SaveBuild = async (formData) => {
    const { data } = await VidiemServer.post(`/save-build`, formData);
    return data;
}

export {
    FetchProducts,
    FetchProductInfo,
    CreateCustomization,
    CurrentCustomization,
    UpdateCustomization,
    ClearCustomization,
    SaveBuild
}
