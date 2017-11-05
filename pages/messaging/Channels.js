import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MKButton} from 'react-native-material-kit';

const channelButtonStyle = {
    backgroundColor: '#FFF',
    borderRadius: 55 / 2,
    width: 55,
    height: 55,
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center'
};

const channelButtonContentStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    textAlign: 'center',
};

const activeChannel = {
    ...channelButtonStyle,
    width: 75,
    height: 75,
    margin: 0,
    borderRadius: 0,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
        width: -1,
        height: 1
    }
};

const ColoredFab = MKButton.coloredFab()
    .withStyle({
        margin: 10,
        width: 55,
        height: 55
    });

const AddConvoButton = ColoredFab.withBackgroundColor('#FFB100').build();
const GeneralButton = ColoredFab.withBackgroundColor('#FFF').build();


export default Channels = () => (
    <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
            <GeneralButton>
                <MaterialIcons name='people-outline' size={26} style={channelButtonContentStyle}/>
            </GeneralButton>
            <View style={activeChannel}>
                <Text style={channelButtonContentStyle}>LC</Text>
            </View>
            <GeneralButton>
                <Text style={channelButtonContentStyle}>CC</Text>
            </GeneralButton>
            <AddConvoButton>
                <MaterialIcons name='add' size={26} style={{...channelButtonContentStyle, 'color': '#FFF'}}/>
            </AddConvoButton>
        </ScrollView>
        <GeneralButton>
            <MaterialCommunityIcons name='alert-decagram' size={26} style={{...channelButtonContentStyle, color: 'red'}} />
        </GeneralButton>
    </View>
);