import { AppRegistry } from 'react-native';
import App from './App';
import {setCustomText} from 'react-native-global-props';

setCustomText({
    fontFamily: 'Roboto'
});

AppRegistry.registerComponent('LifeStrengths', () => App);
