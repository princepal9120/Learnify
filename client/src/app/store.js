import {configureStore } from "@reduxjs/toolkit"
import { authApi } from "@/features/api/authApi.js"
import rootReducer from "./rootReducer.js"
import { courseApi } from "@/features/api/courseApi.js"
import { purchaseApi } from "@/features/api/purchaseApi.js"
import { courseProgressApi } from "@/features/api/courseProgressApi.js"

export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (dm) => dm().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware)
})

// Initialize app - try to load user but don't block on failure
const initializeApp = async () => {
  try {
    await appStore.dispatch(
      authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
    )
    console.log("✓ User profile loaded")
  } catch (error) {
    console.log("ℹ️ App initialized without user (guest mode)")
  }
}

initializeApp()