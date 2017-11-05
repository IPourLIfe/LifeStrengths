import React, {Component} from 'react';
import {View, Text, TouchableNativeFeedback, TouchableOpacity, Platform, ScrollView} from 'react-native';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const LocationNavigateCard = props => {
    return (
        <Touchable style={{
            backgroundColor: '#FFF',
            margin: 15,
            marginLeft: 20,
            marginRight: 20,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 0
            },
            shadowRadius: 2,
            shadowOpacity: 0.3
        }} onPress={() => {
        }}>
            <Text style={{
                fontWeight: '500',
                fontSize: 28,
                marginBottom: 10,
                color: '#0097A7'
            }}>{props.title}</Text>
            <Text style={{
                fontSize: 16,
                color: '#747474'
            }}>{props.subtitle}</Text>
        </Touchable>
    );
};

export default Location = () => (
    <View style={{flex: 1}}>
        <View style={{height: 60, width: '100%', backgroundColor: '#00BCD4', paddingTop: 20, paddingLeft: 20}}>
            <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold'}}>Transportation</Text>
        </View>
        <ScrollView style={{flex: 1}}>
            <LocationNavigateCard title='My Location' subtitle='Explore a map of your current location'/>
            <LocationNavigateCard title='City Bus' subtitle='Schedules and maps for local City Utilities buses'/>
            <LocationNavigateCard title='Greyhound' subtitle='Bus schedules and tickets for long distance travel'/>
            <LocationNavigateCard title='OATS' subtitle='Schedules for local transit shuttle buses'/>
        </ScrollView>
    </View>
);