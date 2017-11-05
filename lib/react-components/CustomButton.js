import React, {Component} from 'react';
import {Text, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export default class CustomButton extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {
            buttonStyle: {
                margin: 'auto',
                alignSelf: 'center',
                backgroundColor: '#FFB100',
                alignContent: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                paddingLeft: 10,
                paddingRight: 10,
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.3,
                ...this.props.buttonStyle
            },
            titleStyle: {
                lineHeight: 36,
                fontWeight: 'bold',
                fontSize: 16,
                color: '#FFF',
                textAlign: 'center',
                ...this.props.titleStyle
            }
        };

        if (typeof this.props.onPress === void(0)) {
            this.state.onPress = () => {
            };
        }

    }

    render() {
        return (
            <Touchable style={this.state.buttonStyle} onPress={this.state.onPress}>
                <Text style={this.state.titleStyle}>{this.props.title}</Text>
            </Touchable>
        );
    }
}