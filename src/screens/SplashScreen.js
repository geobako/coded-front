import React, { useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { goToAuth, goToMoviesListing } from '../navigation'
import AsyncStorage from '@react-native-community/async-storage'

const SplashScreen = () => {

    const searchToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                goToMoviesListing()
            } else {
                goToAuth()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        searchToken()
    }, []);



    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Loading</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 28
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SplashScreen