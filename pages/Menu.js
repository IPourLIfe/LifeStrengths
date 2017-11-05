import React, {Component} from 'react';
import {View, Text, Image, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import * as Authentication from '../lib/Authentication';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;


const MenuButton = (props) => (
    <Touchable style={{width: '100%', height: 60}} onPress={props.onPress}>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{
                width: 40,
                height: 40,
                margin: 10,
                marginRight: 20,
                alignContent: 'center',
                justifyContent: 'center'
            }}>
                {props.children ? props.children :
                    (<MaterialCommunityIcons name={props.iconName}
                                             style={{color: props.iconColor ? props.iconColor : '#000'}} size={38}/>)}
            </View>
            <View style={{flex: 1, alignContent: 'center'}}>
                <Text style={{lineHeight: 60, fontSize: 16}}>{props.title}</Text>
            </View>
        </View>
    </Touchable>
);

export default class Menu extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {profile: null};
    }

    async componentWillMount() {
        const profile = await Authentication.getProfile();

        this.setState(() => {
            return {profile};
        });
    }

    getProfileHeader() {
        if(!this.state.profile) {
            return null;
        }

        return (
            <View style={{backgroundColor: '#00BCD4', height: 160, padding: 20, paddingTop: 30, width: '100%'}}>
                <Image style={{
                    width: 64,
                    height: 64,
                    borderRadius: 64 / 2,
                    marginBottom: 20
                }}
                       source={{uri: this.state.profile.picture}}/>
                <Text style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 16
                }}>{this.state.profile.name}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
                {this.getProfileHeader()}
                <MenuButton title='I Need Help' iconName='alert-decagram' iconColor='red' onPress={() => {
                }}/>
                <MenuButton title='Profile' iconName='account' onPress={() => {
                }}/>
                <MenuButton title='Wish List' onPress={() => {
                }}>
                    <SimpleLineIcons name='magic-wand' style={{marginLeft: 5}} size={30}/>
                </MenuButton>
                <MenuButton title='Settings' iconName='settings' onPress={() => {
                }}/>
                <MenuButton title='Log Out' onPress={() => {
                    Authentication.logout()
                }}>
                    <MaterialCommunityIcons name='logout' style={{marginLeft: 5}} size={38}/>
                </MenuButton>
            </View>
        );
    }
}