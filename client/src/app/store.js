import {configureStore } from "@reduxjs/toolkit"
import { authApi } from "@/features/api/authApi.js"
import rootReducer from "./rootReducer.js"

export const appStore= configureStore({
    reducer: rootReducer,
    middleware: (dm)=> dm().concat(authApi.middleware)
})

const initializeApp =async () => {
 await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch: true}))   
}
initializeApp();