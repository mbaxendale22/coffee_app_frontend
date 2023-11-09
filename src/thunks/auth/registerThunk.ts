import { AppThunk } from '../../redux/reduxTypes'
import { RegisterParams, register } from '../../api/auth'
import {
    endLoginRequest,
    setLoginRequestError,
    startLoginRequest,
} from '../../redux/userSlice'
import { AxiosError } from 'axios'

export const registerThunk =
    (params: RegisterParams): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startLoginRequest())

            // login for access token
            const response = await register(params)

            if (!response || response.status !== 200) {
                dispatch(setLoginRequestError('error creating user'))
                throw new Error()
            }

            dispatch(endLoginRequest())
        } catch (error: unknown) {
            let errorMessage = 'unknown error'
            if (error instanceof AxiosError) {
                errorMessage = error.message
                const isUsernameError = error.response?.data.errors.username
                const isEmailError = error.response?.data.errors.email
                if (isUsernameError) {
                    errorMessage = 'username already taken'
                }
                if (isEmailError) {
                    errorMessage =
                        'looks like you already have an account with that email'
                }
            }
            dispatch(setLoginRequestError(errorMessage))
        }
    }
