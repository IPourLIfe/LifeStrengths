/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RootTabs from './RootTabs';

export default class App extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {
            hasLoggedIn: false,
            isAuthenticating: false,
            profile: null
        };
    }

    async componentDidMount() {
        //PubSub.subscribe(Authentication.LOGOUT, this.onLogout.bind(this));
    }

    onLogout() {
        this.setState(() => {
            return {
                profile: null,
                hasLoggedIn: false,
                isAuthenticating: false
            };
        });
    }

    render() {
        /*if (!this.state.hasLoggedIn) {
            return <View style={{flex: 1}}/>;
        }*/

        return (
            <View style={{flex: 1}}>
                <View style={{height: 20, width: '100%', backgroundColor: '#0097A7'}}/>
                <RootTabs style={{flex: 1}}/>
            </View>
        );
    }
}