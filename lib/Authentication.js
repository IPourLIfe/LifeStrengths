import PubSub from 'pubsub-js';
import Auth0 from 'react-native-auth0';
import {AsyncStorage} from 'react-native';
import FirebaseApp from './Firebase';

const PROFILE_STORAGE_KEY = '@LifeStrengthsStorage:profile';
const ACCESS_TOKEN_STORAGE_KEY = '@LifeStrengthsStorage:accessToken';

export const LOGIN_SUCCESS = 'lifestrengths.auth.login.success';
export const LOGIN_FAILED = 'lifestrengths.auth.login.failure';
export const LOGOUT = 'lifestrengths.auth.logout';

const auth0 = new Auth0({
    domain: 'lifestrengths.auth0.com',
    clientId: 'uFkH21yuHTyYWv_jxgVFCw_d48K6Nr5G'
});

let profile = null;

export async function login() {
    try {
        console.log('logging in');

        const credentials = await auth0
            .webAuth
            .authorize({
                scope: 'openid profile email',
                audience: 'https://lifestrengths.auth0.com/userinfo',
                prompt: 'select_account'
            });

        if (!credentials) {
            PubSub.publish(LOGIN_FAILED);

            return;
        }

        const accessToken = credentials['accessToken'];

        let profile = await auth0.auth.userInfo({token: accessToken});

        await AsyncStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
        await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));

        await FirebaseApp.auth().signInWithCustomToken(profile['https://lifestrengths-12caf.firebaseapp.com/firebase_token']);

        PubSub.publish(LOGIN_SUCCESS, profile);

        return profile;
    }
    catch (exception) {
        PubSub.publish(LOGIN_FAILED);
    }
}

export async function logout() {
    profile = null;

    await AsyncStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);

    PubSub.publish(LOGOUT);
}

export async function getProfile() {
    if(profile) {
        return profile;
    }

    profile = JSON.parse(await AsyncStorage.getItem(PROFILE_STORAGE_KEY));

    return profile;
}