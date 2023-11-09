import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { loginThunk } from '../../thunks/auth/loginThunk'
import {
    userRequestError,
    userRequestIsLoadingSelector,
} from '../../redux/userSlice'
import { EyeIcon, EyeSlashedIcon } from '../../assets/icons'
import { useState } from 'react'

type LoginFormInputs = {
    email: string
    password: string
}

const schema = yup
    .object({
        email: yup.string().required().email(),
        password: yup.string().required(),
    })
    .required()

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(schema),
    })
    const dispatch = useAppDispatch()
    const isLoginError = useAppSelector(userRequestError)
    const isLoading = useAppSelector(userRequestIsLoadingSelector)
    const [showPassword, setShowPassword] = useState(false)
    const onSubmit = (data: LoginFormInputs) => {
        //TODO : add navigation on success
        dispatch(loginThunk(data.email, data.password))
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="join join-vertical bg-base-200 p-2 ">
                {' '}
                <input
                    {...register('email')}
                    placeholder="email"
                    className="input input-bordered input-accent mb-4 w-full max-w-xs"
                />
                <p className="mb-4 text-error">{errors.email?.message}</p>
                <div className="relative">
                    <input
                        {...register('password')}
                        placeholder="password"
                        type={showPassword ? 'text' : 'password'}
                        className="input input-bordered input-accent mb-4 w-full  max-w-xs"
                    />
                    <div
                        className="absolute right-3 top-3 cursor-pointer"
                        onClick={handleShowPassword}
                    >
                        {showPassword ? <EyeSlashedIcon /> : <EyeIcon />}
                    </div>
                </div>
                <p className="mb-4 text-error">{errors.password?.message}</p>
                <input
                    type="submit"
                    className={
                        isLoading
                            ? 'btn btn-accent opacity-25'
                            : 'btn btn-accent'
                    }
                    value={'Login'}
                    disabled={isLoading}
                />
            </fieldset>
            {isLoginError ? (
                <p className="text-error">Incorrect email or password</p>
            ) : null}
        </form>
    )
}
