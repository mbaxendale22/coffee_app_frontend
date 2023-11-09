import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
    userRequestError,
    userRequestIsLoadingSelector,
} from '../../redux/userSlice'
import { registerThunk } from '../../thunks/auth/registerThunk'
import { useState } from 'react'
import { EyeIcon, EyeSlashedIcon } from '../../assets/icons'

type RegisterFormInputs = {
    username: string
    email: string
    password: string
    passwordConfirmation: string
}

const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    passwordConfirmation: yup
        .string()
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        })
        .required(),
})

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: yupResolver(schema),
    })
    const dispatch = useAppDispatch()
    const RegisterErrorMessage = useAppSelector(userRequestError)
    const isLoading = useAppSelector(userRequestIsLoadingSelector)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

    const onSubmit = (data: RegisterFormInputs) => {
        //TODO : add navigation on success
        dispatch(registerThunk(data))
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="join join-vertical bg-base-200 p-2 ">
                {' '}
                <input
                    {...register('username')}
                    placeholder="select a username"
                    className="input input-bordered input-accent mb-4 w-full max-w-xs"
                />
                <p className="mb-4 text-error">{errors.username?.message}</p>
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
                <div className="relative">
                    <input
                        {...register('passwordConfirmation')}
                        placeholder="confirm password"
                        type={showPasswordConfirm ? 'text' : 'password'}
                        className="input input-bordered input-accent mb-4 w-full  max-w-xs"
                    />
                    <div
                        className="absolute right-3 top-3 cursor-pointer"
                        onClick={handleShowPasswordConfirm}
                    >
                        {showPasswordConfirm ? <EyeSlashedIcon /> : <EyeIcon />}
                    </div>
                </div>
                <p className="mb-4 text-error">
                    {errors.passwordConfirmation?.message}
                </p>
                <input
                    type="submit"
                    className={
                        isLoading
                            ? 'btn btn-accent opacity-25'
                            : 'btn btn-accent'
                    }
                    value={'Register'}
                    disabled={isLoading}
                />
            </fieldset>
            {RegisterErrorMessage ? (
                <p className="text-error">{RegisterErrorMessage}</p>
            ) : null}
        </form>
    )
}
