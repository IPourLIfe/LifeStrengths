import React, {Component} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CreateButton from '../../lib/react-components/Button';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const lessonViewStyle = {
    padding: 20,
    flex: 1,
    flexDirection: 'row'
};

const lessonTextStyle = {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 36
};

const OpenAssignment = CreateButton('Assigned');

export default class Curriculum extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {
            curriculumProgress: 0.15
        };
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
                <ScrollView style={{flex: 1}}>
                    <View style={{padding: 40, paddingTop: 20, paddingBottom: 0, width: '100%'}}>
                        <View style={{
                            height: 40, width: '100%',
                            borderRadius: 20,
                            borderColor: '#0097A7',
                            borderWidth: 2,
                            overflow: 'hidden'
                        }}>
                            <LinearGradient colors={['#FFB100', '#FFB100', '#00BCD4', '#00BCD4']}
                                            start={{x: 0.0, y: 0.5}} end={{x: 1, y: 0.5}}
                                            locations={[0, this.state.curriculumProgress, this.state.curriculumProgress + .3, 1]}
                                            style={{
                                                width: '100%',
                                                height: 36,
                                                alignContent: 'center',
                                                justifyContent: 'center'
                                            }}>
                                <Text style={{
                                    backgroundColor: 'transparent',
                                    color: '#FFF',
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>{Math.floor(this.state.curriculumProgress * 100)}% Complete</Text>
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={{borderBottomColor: '#DDD', borderBottomWidth: 1, padding: 10, paddingTop: 30}}>
                        <Text style={{fontSize: 16, color: '#00BCD4', fontWeight: '500'}}>RELATIONAL DEVELOPMENT</Text>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Lesson 1</Text>
                        </View>
                        <OpenAssignment onPress={() => this.props.navigation.navigate('LessonView', {lessonName: 'Lesson 1'})}/>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Lesson 2</Text>
                        </View>
                        <Image source={require('../../assets/checked-dark.png')} style={{width: 25, height: 20, marginTop: 8, resizeMode: 'contain'}}/>
                    </View>

                    <View style={{borderBottomColor: '#DDD', borderBottomWidth: 1, padding: 10, paddingTop: 30}}>
                        <Text style={{fontSize: 16, color: '#00BCD4', fontWeight: '500'}}>SITUATIONAL DEVELOPMENT</Text>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Lesson 1</Text>
                        </View>
                        <Image source={require('../../assets/checked-dark.png')} style={{width: 25, height: 20, marginTop: 8, resizeMode: 'contain'}}/>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Lesson 2</Text>
                        </View>
                        <OpenAssignment onPress={() => this.props.navigation.navigate('LessonView', {lessonName: 'Lesson 2'})}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
