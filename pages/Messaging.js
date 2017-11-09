import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Channels} from './messaging/Channels';
import {ChatBox} from './messaging/ChatBox';

const mainMessageViewStyle = {
    flex: 1
}
const messagesHeaderStyle = {
    height: 60,
    width: '100%',
    backgroundColor: '#00BCD4',
    paddingTop: 20,
    paddingLeft: 20
}
const messagesHeaderTextStyle = {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
}
const messagesContainerStyle = {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EEE'
}
const messagesChannelsStyle = {
    width: 75,
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    bottom: 0
}
const messagesChatBoxStyle = {
    flex: 1,
    marginLeft: 75,
    backgroundColor: '#FFF'
}
export default Messaging = () => (
    <View style={mainMessageViewStyle}>
        <View style={messagesHeaderStyle}>
            <Text style={messagesHeaderTextStyle}>Messages</Text>
        </View>
        <View style={messagesContainerStyle}>
            <View style={messagesChannelsStyle}>
                <Channels/>
            </View>
            <View style={messagesChatBoxStyle}>
                <ChatBox/>
            </View>
        </View>
    </View>
)
