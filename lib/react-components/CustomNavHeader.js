import React, {Component} from 'react';
import {View, Text, TouchableNativeFeedback, TouchableOpacity, Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

class NavigateBack extends Component<{}> {
    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <Touchable style={{marginRight: 20, marginTop: 2}} onPress={() => this.goBack()}>
                <MaterialIcons style={{color: '#FFF'}} name='arrow-back' size={28}/>
            </Touchable>
        );
    }
}

export default class CustomNavHeader extends Component<{}> {
    render() {
        return (
            <View style={{height: 60, backgroundColor: '#00BCD4', flexDirection: 'row', padding: 15}}>
                {this.props.back ?
                    <NavigateBack style={{width: 30, height: 30}} navigation={this.props.navigation}/> : null}
                <Text
                    style={{color: '#FFF', fontSize: 20, fontWeight: 'bold', lineHeight: 30}}>{this.props.title}</Text>
            </View>
        );
    }
}