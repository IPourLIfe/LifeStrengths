import React, {Component} from 'react';
import {View, Text} from 'react-native';
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
            },
            indicatorStyle: {
                backgroundColor: '#FFB100'
            }
        }
    });


export default Home = () => (
    <View style={{flex: 1}}>
        <View style={{height: 40, width: '100%', backgroundColor: '#00BCD4', paddingTop: 20, paddingLeft: 20}}>
            <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold'}}>News</Text>
        </View>
        <HomeTab style={{flex: 1}}/>
    </View>
);