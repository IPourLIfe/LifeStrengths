import React, {Component} from 'react';
import {View} from 'react-native';
import GroupEvents from './home/GroupEvents';
import Notifications from './home/Notifications';
import {TabNavigator} from 'react-navigation';

const HomeTab = TabNavigator({
        GroupEvents: {
            screen: GroupEvents,
            navigationOptions: {
                tabBarLabel: 'Group Events'
            },
        },
        Notifications: {
            screen: Notifications,
            navigationOptions: {
                tabBarLabel: 'Notifications'
            },
        }
    },
    {
        tabBarPosition: 'top',
        tabBarOptions: {
            tabStyle: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            },
            style: {
                height: 75
            }
        }
    });

export default Home = () => (
    <View style={{flex: 1}}>
        <HomeTab/>
    </View>
);