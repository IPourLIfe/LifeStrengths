import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const channelButtonStyle = {
    backgroundColor: '#FFF',
    borderRadius: 55 / 2,
    width: 55,
    height: 55,
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center'
};

const channelButtonContentStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    textAlign: 'center'
};

const activeChannel = {
    ...channelButtonStyle,
    width: 75,
    height: 75,
    margin: 0,
    borderRadius: 0
};


export default Channels = () => (
    <View style={{flex: 1, backgroundColor: '#EEE'}}>
        <ScrollView style={{flex: 1}}>
            <View style={channelButtonStyle}>
                <MaterialIcons name='people-outline' size={26} style={channelButtonContentStyle}/>
            </View>
            <View style={activeChannel}>
                <Text style={channelButtonContentStyle}>LC</Text>
            </View>
            <View style={channelButtonStyle}>
                <Text style={channelButtonContentStyle}>CC</Text>
            </View>
            <View style={{...channelButtonStyle, backgroundColor: '#FFB100'}}>
                <MaterialIcons name='add' size={26} style={channelButtonContentStyle}/>
            </View>
        </ScrollView>
        <View style={channelButtonStyle}>
            <MaterialCommunityIcons name='alert-decagram' size={26} style={{...channelButtonContentStyle, color: 'red'}} />
        </View>
    </View>
);