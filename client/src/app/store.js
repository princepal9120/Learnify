import {configureStore } from "@reduxjs/toolkit"
import { authApi } from "@/features/api/authApi.js"
import rootReducer from "./rootReducer.js"
import { courseApi } from "@/features/api/courseApi.js"
import { purchaseApi } from "@/features/api/purchaseApi.js"
import { courseProgressApi } from "@/features/api/courseProgressApi.js"

export const appStore= configureStore({
    reducer: rootReducer,
    middleware: (dm)=> dm().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware)
})

const initializeApp =async () => {
 await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch: true}))   
}
initializeApp();