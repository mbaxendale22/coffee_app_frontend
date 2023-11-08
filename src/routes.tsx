import { createBrowserRouter } from 'react-router-dom'
import { AppRoot } from './App'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppRoot />,
        // loader: rootLoader,
        children: [
            // {
            //   path: "team",
            //   element: <Team />,
            //   loader: teamLoader,
            // },
        ],
    },
])
