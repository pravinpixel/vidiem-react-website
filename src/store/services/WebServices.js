import VidiemServer from "helpers/AxiosConfig";

const FetchBodyStyles = async () => {
    const { data } = await VidiemServer.get(`/select-body`);
    return data;
}
const FetchColors = async (bodyId) => {
    const { data } = await VidiemServer.get(`/select-body-color?body_id=${bodyId}`);
    return data;
}
const FetchMotors = async (bodyId) => {
    const { data } = await VidiemServer.get(`/select-motor?body_id=${bodyId}`);
    return data;
}
const FetchJarStyles = async (uuid) => {
    const { data } = await VidiemServer.get(`/select-grinding-type?uuid=${uuid}`);
    return data;
}
const FetchJarProperties = async (categoryId) => {
    const { data } = await VidiemServer.get(`/list-shape-lid-handle?grind_type_id=${categoryId}`);
    return data;
}
const ResetJarProperties = async (formData) => {
    const { data } = await VidiemServer.post(`/clear-shape-lid-handle`, formData);
    return data;
}
const FetchJarCustomised = async (qs) => {
    const { data } = await VidiemServer.get(`/jars-customisation-selected-list?${qs}`);
    return data;
}
const FetchJarPreferences = async (productId, jarId) => {
    const { data } = await VidiemServer.get(`/products/${productId}/${jarId}`);
    return data;
}
const FetchJarDetails = async (jarId) => {
    const { data } = await VidiemServer.get(`/jars-details?jar_id=${jarId}`);
    return data;
}
const PreviewCoordinates = async (baseId) => {
    const { data } = await VidiemServer.get(`/personalisation-message?base_id=${baseId}`);
    return data;
}
const MyOrders = async () => {
    const { data } = await VidiemServer.get(`/my-orders`);
    return data;
}
const MyCustomizations = async () => {
    const { data } = await VidiemServer.get(`/my-customisations`);
    return data;
}
const FetchPackingInfo = async () => {
    const { data } = await VidiemServer.get(`/packing`);
    return data;
}
const ResetJarPropertiesAlt = async (formData) => {
    const { data } = await VidiemServer.post(`/clear-shape-lid-handle-except-jar`, formData);
    return data;
}

export {
    FetchBodyStyles,
    FetchColors,
    FetchMotors,
    FetchJarStyles,
    FetchJarProperties,
    ResetJarProperties,
    FetchJarCustomised,
    FetchJarPreferences,
    FetchJarDetails,
    PreviewCoordinates,
    MyOrders,
    MyCustomizations,
    FetchPackingInfo,
    ResetJarPropertiesAlt
}
