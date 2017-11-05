import React, {Component} from 'react';
import {TabNavigator, TabBarTop} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './pages/Home';
import Messaging from './pages/Messaging';
import Location from './pages/Location';
import Curriculum from './pages/Curriculum';
import Menu from './pages/Menu';

export default RootTabs = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name='home'
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    Messaging: {
        screen: Messaging,
        navigationOptions: {
            tabBarLabel: 'Messaging',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name='chat'
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    Location: {
        screen: Location,
        navigationOptions: {
            tabBarLabel: 'Location',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name='pin-drop'
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    Curriculum: {
        screen: Curriculum,
        navigationOptions: {
            tabBarLabel: 'Curriculum',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialCommunityIcons
                    name='clipboard-text'
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    Menu: {
        screen: Menu,
        navigationOptions: {
            tabBarLabel: 'Menu',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name='menu'
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
}, {
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            backgroundColor: '#EEE',
            height: 60
        },
        inactiveTintColor: '#000',
        activeTintColor: '#0097A7',
        pressOpacity: 1
    }
});