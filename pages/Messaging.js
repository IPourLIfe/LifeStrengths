import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Channels from './messaging/Channels';
import ChatBox from './messaging/ChatBox';

export default Messaging = () => (
    <View style={{flex: 1}}>
        <View style={{height: 60, width: '100%', backgroundColor: '#00BCD4', paddingTop: 20, paddingLeft: 20}}>
            <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold'}}>Messages</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: 75}}>
                <Channels/>
            </View>
            <View style={{flex: 1}}>
                <ChatBox/>
            </View>
        </View>
    </View>
);