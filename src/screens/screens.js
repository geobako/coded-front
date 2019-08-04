import SplashScreen from './SplashScreen'
import { Navigation } from 'react-native-navigation';
import Login from './Login'
import Register from './Register'
import MoviesListing from './MoviesListing'
import SingleMovie from './SingleMovie'


const registerScreens = () => {
    Navigation.registerComponent(`SplashScreen`, () => SplashScreen);
    Navigation.registerComponent(`LoginScreen`, () => Login);
    Navigation.registerComponent(`RegisterScreen`, () => Register);
    Navigation.registerComponent(`MoviesListingScreen`, () => MoviesListing);
    Navigation.registerComponent(`SingleMovieScreen`, () => SingleMovie);


}

export default registerScreens