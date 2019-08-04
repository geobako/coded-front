import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { movies } from '../util/moviesList'
import Icon from 'react-native-vector-icons/Ionicons'
import { Navigation } from 'react-native-navigation'



export default function MoviesListing(props) {


    const keyExtractor = (item) => item.title

    const goToSingleMovie = (index, title) => {
        Navigation.push(props.componentId, {
            component: {
                name: 'SingleMovieScreen',
                passProps: {
                    index: index
                },
                options: {
                    topBar: {
                        title: {
                            text: title
                        }
                    }
                }
            }
        });
    }

    renderItem = ({ item, index }) => (
        <ListItem
            title={item.title}
            subtitle={item.year}
            containerStyle={styles.containerStyle}
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}
            onPress={() => goToSingleMovie(index, item.title)}
            rightIcon={
                <Icon
                    name='ios-arrow-dropright'
                    size={24}
                    color='#5c5a56'
                />
            }
        />
    )


    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={movies}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#83b2d4',
        backgroundColor: '#e9f0f5'
    },
    titleStyle: {
        color: '#5c5a56',
        fontSize: 20
    },
    subtitleStyle: {
        fontSize: 12
    }
})
