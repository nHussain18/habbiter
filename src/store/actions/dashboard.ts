// import {
//     USER_LOGIN,
//     SET_USER_PROFILE_DATA,
//     LOGOUT,
//     FORGOT_USERNAME,
//     FORGOT_PASSWORD,
//     UPLOAD_IMAGE,
//     UPSERT_TOKEN,
//     CREATE_LOG
// } from '../types'

// import { authServices } from '@services';
// import { createAsyncThunk } from '@reduxjs/toolkit'

// const setUserData = async (data: any) => {
//     if (data) {
//         try {
//             await AsyncStorage.setItem("token", JSON.stringify(data))
//         } catch (e) {
//             console.log("SET Item ERROR", e);
//         }
//     }
// }

// export const userLogin = createAsyncThunk(
//     USER_LOGIN,
//     async (data) => {
//         const response = await authServices.userLogin(data)
//         setUserData(response?.data?.data)
//         return response?.data
//     }
// )

// export const uploadImage = createAsyncThunk(
//     UPLOAD_IMAGE,
//     async (url:string) => {
//         var images = new FormData();
//         images.append('image', {
//             uri: url,
//             name: 'userProfile.jpg',
//             type: 'image/jpg',
//         });
//         const response = await authServices.uploadImage(images)
//         return response?.data
//     }
// )
