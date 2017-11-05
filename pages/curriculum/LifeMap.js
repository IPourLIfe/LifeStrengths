import React, {Component} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, TouchableNativeFeedback, Platform, Alert} from 'react-native';
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

const DoneButton = CreateButton('Done');

export default class Curriculum extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {
            curriculumProgress: 0.15
        };
    }

    completeTask(task) {
        Alert.alert(
            'Congratulations!',
            "You've completed a life map task: \n\n" +
            task + "\n\n" +
            "Do you want to share the great news with everyone?",
            [
                {text: 'Yes', onPress: () => console.log('OK Pressed'), style: 'cancel'},
                {text: 'No', onPress: () => console.log('Cancel Pressed')},
            ],
            { cancelable: false }
        )
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
                        <Text style={{fontSize: 16, color: '#00BCD4', fontWeight: '500'}}>GO ON A VACATION TO PANAMA</Text>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Get a Job</Text>
                        </View>
                        <Image source={require('../../assets/checked-dark.png')} style={{width: 25, height: 20, marginTop: 8, resizeMode: 'contain'}}/>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Save enough money</Text>
                        </View>
                        <Image source={require('../../assets/checked-dark.png')} style={{width: 25, height: 20, marginTop: 8, resizeMode: 'contain'}}/>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Get a passport</Text>
                        </View>
                        <Image source={require('../../assets/checked-dark.png')} style={{width: 25, height: 20, marginTop: 8, resizeMode: 'contain'}}/>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Buy a plane ticket</Text>
                        </View>
                        <DoneButton onPress={() => this.completeTask('Buy a plane ticket')}/>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Book a hotel room</Text>
                        </View>
                        <DoneButton onPress={() => this.completeTask('Book a hotel room')}/>
                    </View>
                    <View style={{borderBottomColor: '#DDD', borderBottomWidth: 1, padding: 10, paddingTop: 30}}>
                        <Text style={{fontSize: 16, color: '#00BCD4', fontWeight: '500'}}>GO ON A VACATION TO PANAMA</Text>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Get a Job</Text>
                        </View>
                        <Image source={require('../../assets/checked-dark.png')} style={{width: 25, height: 20, marginTop: 8, resizeMode: 'contain'}}/>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Save enough money</Text>
                        </View>
                        <Image source={require('../../assets/checked-dark.png')} style={{width: 25, height: 20, marginTop: 8, resizeMode: 'contain'}}/>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Get a passport</Text>
                        </View>
                        <Image source={require('../../assets/checked-dark.png')} style={{width: 25, height: 20, marginTop: 8, resizeMode: 'contain'}}/>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Buy a plane ticket</Text>
                        </View>
                        <DoneButton onPress={() => this.completeTask('Buy a plane ticket')}/>
                    </View>
                    <View style={lessonViewStyle}>
                        <View style={{flex: 1}}>
                            <Text style={lessonTextStyle}>Book a hotel room</Text>
                        </View>
                        <DoneButton onPress={() => this.completeTask('Book a hotel room')}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}