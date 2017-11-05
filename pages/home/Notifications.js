import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';

const eventRecordStyle = {
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row'
};

const eventNameStyle = {
    fontSize: 16
};

const eventTimeStyle = {
    fontSize: 14,
    color: '#AAA'
};

const channelButtonStyle = {
    backgroundColor: 'rgba(0,188,212,0.7)',
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 3,
    marginRight: 20
};

const channelButtonContentStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 10
};


export default Notifications = () => (
    <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
        <View style={{borderBottomColor: '#DDD', borderBottomWidth: 1, padding: 15, paddingLeft: 20}}>
            <Text style={{fontSize: 16, color: '#FFB100', fontWeight: 'bold'}}>NEW</Text>
        </View>
        <View style={eventRecordStyle}>
            <View style={channelButtonStyle}>
                <Text style={channelButtonContentStyle}>LC</Text>
            </View>
            <View>
                <Text style={eventNameStyle}>Lisa C. assigned you a lesson</Text>
                <Text style={eventTimeStyle}>Today, 8:45am</Text>
            </View>
        </View>
        <View style={eventRecordStyle}>
            <View style={channelButtonStyle}>
                <Text style={channelButtonContentStyle}>CC</Text>
            </View>
            <View>
                <Text style={eventNameStyle}>Connie C. sent you a message</Text>
                <Text style={eventTimeStyle}>Today, 10:15am</Text>
            </View>
        </View>
        <View style={{borderBottomColor: '#DDD', borderBottomWidth: 1, padding: 15, paddingLeft: 20, marginTop: 30}}>
            <Text style={{fontSize: 16, color: '#FFB100', fontWeight: 'bold'}}>READ</Text>
        </View>
        <View style={eventRecordStyle}>
            <View style={channelButtonStyle}>
                <Text style={channelButtonContentStyle}>AY</Text>
            </View>
            <View>
                <Text style={eventNameStyle}>Andrew Y. sent the group a message</Text>
                <Text style={eventTimeStyle}>Yesterday, 5:49pm</Text>
            </View>
        </View>
        <View style={eventRecordStyle}>
            <View style={channelButtonStyle}>
                <Text style={channelButtonContentStyle}>CC</Text>
            </View>
            <View>
                <Text style={eventNameStyle}>Connie C. sent the group a message</Text>
                <Text style={eventTimeStyle}>Yesterday, 8:01am</Text>
            </View>
        </View>
        <View style={eventRecordStyle}>
            <View style={channelButtonStyle}>
                <Text style={channelButtonContentStyle}>LC</Text>
            </View>
            <View>
                <Text style={eventNameStyle}>Lisa C. sent you a message</Text>
                <Text style={eventTimeStyle}>Friday, 9:42am</Text>
            </View>
        </View>
        <View style={eventRecordStyle}>
            <View style={channelButtonStyle}>
                <Text style={channelButtonContentStyle}>LC</Text>
            </View>
            <View>
                <Text style={eventNameStyle}>Lisa C. sent you a message</Text>
                <Text style={eventTimeStyle}>Friday, 9:39am</Text>
            </View>
        </View>
    </ScrollView>
);