import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Authentication from './lib/Authentication';

// Within your render function
const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export default class Login extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {showLoginButton: false};
    }

    async componentDidMount() {
        const profile = await Authentication.getProfile();

        if (!profile) {
            this.setState(() => {
                return {showLoginButton: true};
            });
        }
    }

    async login() {
        await Authentication.login();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <LinearGradient colors={['#FFB100', '#00BCD4']}
                                style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                    {this.state.showLoginButton ? (<Touchable style={{
                        width: 300,
                        alignSelf: 'center',
                        height: 40,
                        backgroundColor: '#FFB100',
                        alignContent: 'center',
                        justifyContent: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 4
                        },
                        shadowOpacity: 0.4
                    }} onPress={this.login.bind(this)}>
                        <Text style={{
                            lineHeight: 40,
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: '#FFF',
                            textAlign: 'center'
                        }}>Login</Text>
                    </Touchable>) : null}
                </LinearGradient>
            </View>
        );
    }
}