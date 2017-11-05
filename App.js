/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import PubSub from 'pubsub-js';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RootTabs from './RootTabs';
import Login from './Login';
import * as Authentication from './lib/Authentication';

export default class App extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {
            hasLoggedIn: false,
            profile: null
        };
    }

    async componentDidMount() {
        PubSub.subscribe(Authentication.LOGIN_SUCCESS, this.onLogin.bind(this));
        PubSub.subscribe(Authentication.LOGOUT, this.onLogout.bind(this));

        const profile = await Authentication.getProfile();

        if(profile) {
            this.onLogin();
        }
    }

    async onLogin() {
        const profile = await Authentication.getProfile();

        this.setState(() => {
            return {
                profile,
                hasLoggedIn: true
            };
        });
    }

    onLogout() {
        this.setState(() => {
            return {
                profile: null,
                hasLoggedIn: false
            };
        });
    }

    render() {
        if (!this.state.hasLoggedIn) {
            return <Login/>;
        }

        return (
            <View style={{flex: 1}}>
                <View style={{height: 20, width: '100%', backgroundColor: '#0097A7'}}/>
                <RootTabs style={{flex: 1}}/>
            </View>
        );
    }
}