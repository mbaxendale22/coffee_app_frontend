
import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import userReducer from './userSlice'


export const store = configureStore({
    reducer: {
        //* pass the reducers in here as key value pairs
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)
