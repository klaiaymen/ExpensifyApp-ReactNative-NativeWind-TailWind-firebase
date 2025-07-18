import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user'
// ...

export const store = configureStore({
  reducer: {
    user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactiver la vérification des valeurs non sérialisables
    }),
})