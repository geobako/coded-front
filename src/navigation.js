import { Navigation } from 'react-native-navigation'

export const goToAuth = () => {
    Navigation.setRoot({
        root: {
            stack: {
                id: 'Auth',
                options: {
                    topBar: {
                        visible: true,
                        animate: true,
                        title: {
                            text: 'Login',
                            fontSize: 24,
                            color: 'blue',
                            alignment: 'center'
                        }
                    }
                },
                children: [
                    {
                        component: {
                            id: 'Login',
                            name: 'LoginScreen'
                        }
                    },
                ]
            }
        }
    })
}

export const goToMoviesListing = () => {
    Navigation.setRoot({
        root: {
            stack: {
                id: 'MovieListing',
                options: {
                    topBar: {
                        visible: true,
                        animate: true,
                        title: {
                            text: 'Movies',
                            fontSize: 24,
                            color: 'blue',
                            alignment: 'center'
                        }
                    }
                },
                children: [
                    {
                        component: {
                            id: 'MoviesListing',
                            name: 'MoviesListingScreen'
                        }
                    },
                ]
            }
        }
    })
}