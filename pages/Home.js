import React, {Component} from 'react';
import GroupEvents from './home/GroupEvents';
import Notifications from './home/Notifications';
import {TabNavigator, StackNavigator} from 'react-navigation';
import CustomHeader from '../lib/react-components/CustomNavHeader';

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
            labelStyle: {
                fontWeight: '500'
            },
            style: {
                paddingTop: 0,
                backgroundColor: '#00BCD4'
            },
            indicatorStyle: {
                backgroundColor: '#FFB100',
                height: 3
            }
        }
    });

export default Home = StackNavigator(
    {
        HomeTabs: {
            screen: HomeTab,
            navigationOptions: props => ({
                header: () => (<CustomHeader title='News' back={false} {...props}/>)
            })
        }
    }, {
        headerMode: 'float'
    }
);