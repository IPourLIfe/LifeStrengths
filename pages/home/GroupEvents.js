import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';

const eventRecordStyle = {
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20
};

const eventNameStyle = {
    fontSize: 16
};

const eventTimeStyle = {
    fontSize: 14,
    color: '#AAA'
};

export default GroupEvents = () => (
    <ScrollView style={{flex: 1}}>
        <View style={{borderBottomColor: '#DDD', borderBottomWidth: 1, padding: 15, paddingLeft: 20}}>
            <Text style={{fontSize: 16, color: '#FFB100', fontWeight: 'bold'}}>THIS WEEK</Text>
        </View>
        <View style={eventRecordStyle}>
            <Text style={eventNameStyle}>Family Dinner</Text>
            <Text style={eventTimeStyle}>Friday, Nov 10 - 7pm to 8pm</Text>
        </View>
        <View style={eventRecordStyle}>
            <Text style={eventNameStyle}>Yoga</Text>
            <Text style={eventTimeStyle}>Saturday, Nov 11 - 9pm to 10pm</Text>
        </View>
        <View style={eventRecordStyle}>
            <Text style={eventNameStyle}>Family Dinner</Text>
            <Text style={eventTimeStyle}>Friday, Nov 10 - 7pm to 8pm</Text>
        </View>
        <View style={eventRecordStyle}>
            <Text style={eventNameStyle}>Yoga</Text>
            <Text style={eventTimeStyle}>Saturday, Nov 11 - 9pm to 10pm</Text>
        </View>
        <View style={{borderBottomColor: '#DDD', borderBottomWidth: 1, padding: 15, paddingLeft: 20, marginTop: 30}}>
            <Text style={{fontSize: 16, color: '#FFB100', fontWeight: 'bold'}}>NEXT WEEK</Text>
        </View>
        <View style={eventRecordStyle}>
            <Text style={eventNameStyle}>Team Building Activity</Text>
            <Text style={eventTimeStyle}>Friday, Nov 13 - 4pm to 5:30pm</Text>
        </View>
        <View style={eventRecordStyle}>
            <Text style={eventNameStyle}>Guest Speaker on Software Development</Text>
            <Text style={eventTimeStyle}>Saturday, Nov 13 - 5:30pm to 6:30pm</Text>
        </View>
        <View style={eventRecordStyle}>
            <Text style={eventNameStyle}>Team Building Activity</Text>
            <Text style={eventTimeStyle}>Friday, Nov 13 - 4pm to 5:30pm</Text>
        </View>
        <View style={eventRecordStyle}>
            <Text style={eventNameStyle}>Guest Speaker on Software Development</Text>
            <Text style={eventTimeStyle}>Saturday, Nov 13 - 5:30pm to 6:30pm</Text>
        </View>
    </ScrollView>
);