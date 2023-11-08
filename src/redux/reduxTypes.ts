import type { Action, ThunkAction } from '@reduxjs/toolkit'

import type { store } from './store'

//* Config Types
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
