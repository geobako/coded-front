import React, { useState, useEffect } from 'react'
import {
    View, Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Input } from 'react-native-elements';
import { Navigation } from 'react-native-navigation'
import { goToMoviesListing } from '../navigation'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export default function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const goToRegister = () => {
        Navigation.push(props.componentId, {
            component: {
                id: 'Register',
                name: 'RegisterScreen',
                options: {
                    topBar: {
                        title: {
                            text: 'Register'
                        }
                    }
                }
            }
        });
    }

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

    const loginHandler = async () => {
        if (validate()) {
            try {
                const data = {
                    email: email,
                    password: password
                }
                const loginResponse = await axios.post(`${keys.apiUrl}/auth/login`, data)
                console.log(loginResponse.data)
                await AsyncStorage.setItem('token', loginResponse.data.token)
                await AsyncStorage.setItem('id', loginResponse.data.user._id)
                goToMoviesListing()
            } catch (error) {
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
                <Text style={styles.registerText}>Don't have an account?
                        <Text style={styles.registerTextLink} onPress={goToRegister}>Register</Text>
                </Text>
                <View style={styles.submitLoginContainer}>
                    <View style={styles.submitLogin}>
                        <TouchableOpacity style={styles.submitLoginBtn} onPress={loginHandler}>
                            <Text style={styles.submitLoginText}>Login</Text>
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
