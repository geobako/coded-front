import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, View, StyleSheet, FlatList, Keyboard } from 'react-native'
import { ListItem, Input } from 'react-native-elements'
import { movies } from '../util/moviesList'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import moment from 'moment'
import io from 'socket.io-client'
import keys from '../util/config'

const socket = io(`${keys.apiUrl}`)

export default function SingleMovie(props) {

    const movie = movies[props.index]

    const [comment, setComment] = useState('')
    const [id, setId] = useState('')
    const [data, setData] = useState([])

    const getComments = async () => {
        try {
            const value = await AsyncStorage.getItem('id')
            setId(value)
            const movieTitle = movie.title
            const commentsResponse = await axios.post(`${keys.apiUrl}/comment/all`, { movieTitle })
            setData(commentsResponse.data.comments)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        socket.on('comment added', () => {
            getComments()
        }
        )

        getComments()
    }, []);

    const keyExtractor = (item) => item._id

    renderItem = ({ item }) => (
        <ListItem
            title={`${item.userEmail} ~ ${moment(item.createdAt).format('DD-MM-YYYY')}`}
            subtitle={item.comment}
            containerStyle={styles.containerStyle}
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}

        />
    )

    const submitComment = async () => {
        Keyboard.dismiss()
        const commentData = {
            userId: id,
            comment,
            movieTitle: movie.title
        }

        try {
            const response = await axios.post(`${keys.apiUrl}/comment/new`, commentData)
            const newData = [...data]
            setData(newData)
            newData.unshift(response.data.comment)
            socket.emit('new comment', movie.title)

            setComment('')

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.movieContainer}>
                <Text style={styles.textTitle}>Director:</Text>
                <Text style={styles.text}>{movie.director}</Text>
                <Text style={styles.textTitle}>Rating:</Text>
                <Text style={styles.text}>{movie.rating}</Text>
                <Text style={styles.textTitle}>Description:</Text>
                <Text style={styles.text}>{movie.description}</Text>
                <View style={styles.inputContainer}>
                    <Input
                        containerStyle={{ width: '80%' }}
                        placeholder='Comment'
                        onChangeText={(comment) => setComment(comment)}
                        value={comment}
                        leftIcon={
                            <Icon
                                name='ios-text'
                                size={24}
                                color='grey'
                            />
                        }
                    />
                    <Icon
                        reverse
                        name='ios-send'
                        type='ionicon'
                        // color='#517fa4'
                        reverseColor='red'
                        size={30}
                        onPress={submitComment}
                    />
                </View>

            </KeyboardAvoidingView>
            <View style={styles.commentsContainer}>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={data}
                    renderItem={renderItem}
                />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',

    },
    movieContainer: {
        width: '100%',
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: 'flex-start',
        backgroundColor: '#a2b2f5',
        paddingHorizontal: 3,
        borderRadius: 5,
    },
    textTitle: {
        fontSize: 13,
        color: 'black'
    },
    text: {
        fontSize: 15,
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    commentsContainer: {
        width: '100%',
        marginTop: 4,
        height: '55%'

    },
    containerStyle: {
        width: '85%',
        backgroundColor: '#d8dcf0',
        borderRadius: 10,
        marginBottom: 4,
        marginLeft: 5

    },
    titleStyle: {
        color: '#5c5a56',
        fontSize: 12
    },
    subtitleStyle: {
        fontSize: 17
    }
})
