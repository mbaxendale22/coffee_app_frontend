import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from './reduxTypes'
import storage from 'redux-persist/lib/storage'
import { persistReducer, PURGE } from 'redux-persist'

export type UserState = {
    username: string | null
    access_token: string | null
    isLoading: boolean
    error: string
}

const initialState: UserState = {
    username: null,
    access_token: null,
    isLoading: false,
    error: '',
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        startLoginRequest: (state) => {
            state.isLoading = true
        },
        endLoginRequest: (state) => {
            state.isLoading = false
        },
        setLoginRequestError: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.access_token = action.payload
        },
        setUser: (state, action: PayloadAction<string>) => {
            state.username = action.payload
            state.error = ''
        },
        resetUser: (state) => {
            state.username = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => {
            return initialState
        })
    },
})

export const {
    startLoginRequest,
    endLoginRequest,
    resetUser,
    setAccessToken,
    setLoginRequestError,
    setUser,
} = userSlice.actions
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

export const usernameSelector = ({ user }: RootState) => user.username
export const accessTokenSelector = ({ user }: RootState) => user.access_token
export const userRequestIsLoadingSelector = ({ user }: RootState) =>
    user.isLoading
export const userRequestError = ({ user }: RootState) => user.error
