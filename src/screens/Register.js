import React, { useState, useEffect } from 'react'
import {
    View, Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Input } from 'react-native-elements';
import { Navigation } from 'react-native-navigation'
import axios from 'axios'
import keys from '../util/config'
import { goToAuth } from '../navigation'

export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const validate = () => {
        if (!email.includes('@') || !email.includes('.')) {
            Alert.alert(
                'Email is not valid',
                'Please enter a valid email',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
            return false
        }
        return true
    }



    const registerHandler = async () => {
        if (validate()) {
            try {
                const data = {
                    email: email,
                    password: password
                }
                await axios.post(`${keys.apiUrl}/auth/register`, data)
                goToAuth()
            } catch (error) {
                console.log(error.response.data.message)
                Alert.alert(
                    'A problem occured',
                    error.response.data.message,
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            }

        }

    }

    return (
        <View
            style={styles.imageContainer}>
            <KeyboardAvoidingView style={styles.container}>
                <Input
                    placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    leftIcon={
                        <Icon
                            name='ios-mail'
                            size={24}
                            color='white'
                        />
                    }
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    leftIcon={
                        <Icon
                            name='ios-lock'
                            size={24}
                            color='white'
                        />
                    }
                />

                <View style={styles.submitLoginContainer}>
                    <View style={styles.submitLogin}>
                        <TouchableOpacity style={styles.submitLoginBtn} onPress={registerHandler}>
                            <Text style={styles.submitLoginText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#9cb4db'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 50,
        alignItems: 'center',
    },
    submitLoginContainer: {
        marginTop: 50,
        flex: 1,
        width: '60%',
        justifyContent: 'flex-start'
    },
    submitLogin: {
        width: '100%',
        height: 40,
        backgroundColor: '#e6f2e6',
        borderRadius: 10,
    },
    submitLoginBtn: {
        width: '100%',
        height: '100%'
    },
    submitLoginText: {
        textAlign: 'center',
        fontFamily: 'IndieFlower',
        fontSize: 24,
    },
    registerText: {
        marginTop: 10,
        fontFamily: 'IndieFlower',
        color: '#e6f2e6',
        fontSize: 18
    },
    registerTextLink: {
        paddingLeft: 20,
        textDecorationLine: 'underline'
    }
})
