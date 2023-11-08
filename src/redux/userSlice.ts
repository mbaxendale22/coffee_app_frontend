import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from './reduxTypes'
import storage from 'redux-persist/lib/storage'
import { persistReducer, PURGE } from 'redux-persist'

export type UserState = {
    username: string | null
    access_token: string | null
}

const initialState: UserState = {
    username: null,
    access_token: null,
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        login: (state, action: PayloadAction<string>) => {
            state.username = action.payload
            state.access_token = action.payload
        },
        logout: (state) => {
            state.username = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => {
            return initialState
        })
    },
})

export const { login, logout } = userSlice.actions
export default persistReducer(
    {
        key: 'userDataPersist',
        storage,
        whitelist: ['access_token'],
    },

    userSlice.reducer
)

/*
   Selectors
 */

export const selectUser = ({ application }: RootState) => application.user
export const selectUsername = ({ application }: RootState) =>
    application.user.username
