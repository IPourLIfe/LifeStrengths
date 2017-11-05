import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CurriculumScreen from './curriculum/Curriculum';
import LifeMap from './curriculum/LifeMap';
import {TabNavigator} from 'react-navigation';

const CurriculumTabs = TabNavigator({
        Curriculum: {
            screen: CurriculumScreen,
            navigationOptions: {
                tabBarLabel: 'Curriculum'
            },
        },
        LifeMap: {
            screen: LifeMap,
            navigationOptions: {
                tabBarLabel: 'LifeMap'
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

export default Curriculum = () => (
    <View style={{flex: 1}}>
        <View style={{height: 40, width: '100%', backgroundColor: '#00BCD4', paddingTop: 20, paddingLeft: 20}}>
            <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold'}}>Tasks</Text>
        </View>
        <CurriculumTabs style={{flex: 1}}/>
    </View>
);