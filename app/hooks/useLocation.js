import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export default useLocation = () => {
    const [location, setLocation] = useState()

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = async () => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync()
            let backPerm = await Location.requestBackgroundPermissionsAsync();
            if (!granted) return
            const result = await Location.getLastKnownPositionAsync()
            let latitude = result.coords.latitude
            let longitude = result.coords.longitude
            setLocation({ latitude, longitude })
        } catch (error) {
            console.log(error)
        }
    }

    return location
}

