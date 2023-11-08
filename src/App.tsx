import { useEffect } from 'react'
import axios from 'axios'

export function AppRoot() {
    const url = `${import.meta.env.VITE_BASE_URL}/coffees/search`
    const testApi = async () => {
        const data = await axios.post(url)
        console.log(data)
    }
    useEffect(() => {
        console.log('AppRoot mounted')
        testApi()
    })

    return (
        <div className="mt-4 pb-4">
            <p className="mt-4 pb-4">This is the App Root!</p>
        </div>
    )
}
