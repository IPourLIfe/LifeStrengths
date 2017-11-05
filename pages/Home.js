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
        ...TabNavigator.Presets.AndroidTopTabs,
        tabBarOptions: {
            tabStyle: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            },
            style: {
                paddingTop: 20,
                height: 75,
                backgroundColor: '#00BCD4'
            }
        }
    });

export default Home = () => (
    <View style={{flex: 1}}>
        <HomeTab style={{flex: 1}}/>
    </View>
);