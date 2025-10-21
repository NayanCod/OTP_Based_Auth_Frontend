import { axiosClient, axiosPublic } from "./axiosClient"

export const loginRequestOtp = async (email) => {
    const res = await axiosPublic.post('/auth/login/request-otp', { email });
    return res.data;
};

export const loginVerifyOtp = async (email, otp) => {
    const res = await axiosPublic.post('/auth/login/verify-otp', { email, otp });
    return res.data;
};

export const signupRequestOtp = async (email, name) => {
    const res = await axiosPublic.post('/auth/signup/request-otp', { name, email });
    return res.data;
};

export const signupVerifyOtp = async (name, email, otp) => {
    const res = await axiosPublic.post('/auth/signup/verify-otp', { name, email, otp });
    return res.data;
};

export const fetchUserProfile = async () => {
    const res = await axiosClient.get('/auth/profile');
    return res.data;
}