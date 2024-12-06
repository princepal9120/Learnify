import {configureStore } from "@reduxjs/toolkit"
import { authApi } from "@/features/api/authApi.js"
import rootReducer from "./rootReducer.js"
import { courseApi } from "@/features/api/courseApi.js"

export const appStore= configureStore({
    reducer: rootReducer,
    middleware: (dm)=> dm().concat(authApi.middleware, courseApi.middleware)
})

const initializeApp =async () => {
 await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch: true}))   
}
initializeApp();