import React, {Component} from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import CustomHeader from '../lib/react-components/CustomNavHeader';
import CurriculumScreen from './curriculum/Curriculum';
import LifeMap from './curriculum/LifeMap';
import LessonView from './curriculum/Lesson';

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

export default Curriculum = StackNavigator(
    {
        CurriculumList: {
            screen: CurriculumTabs,
            navigationOptions: props => ({
                header: () => (<CustomHeader title='Tasks' back={false} {...props}/>)
            })
        },
        LessonView: {
            screen: LessonView,
            navigationOptions: props => ({
                header: () => (<CustomHeader title={props.navigation.state.params['lessonName']} back={true} {...props}/>)
            })
        },
    }, {
        headerMode: 'float'
    }
);