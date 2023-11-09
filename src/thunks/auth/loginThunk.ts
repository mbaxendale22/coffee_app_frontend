import { AppThunk } from '../../redux/reduxTypes'
import { login } from '../../api/auth'
import {
    endLoginRequest,
    setAccessToken,
    setLoginRequestError,
    setUser,
    startLoginRequest,
} from '../../redux/userSlice'

export const loginThunk =
    (email: string, password: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(startLoginRequest())

            // login for access token
            const response = await login(email, password)

            if (!response || response.status !== 200) {
                dispatch(setLoginRequestError('error logging in'))
                throw new Error()
            }

            const { token, username } = response.data

            dispatch(setAccessToken(token))
            dispatch(setUser(username))

            dispatch(endLoginRequest())
        } catch (error: unknown) {
            let errorMessage = 'unknown error'
            if (error instanceof Error) {
                errorMessage = error.message
            }
            dispatch(setLoginRequestError(errorMessage))
        }
    }
