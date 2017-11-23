import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MKButton} from 'react-native-material-kit';
import FirebaseApp from '../../lib/Firebase';
import * as Authentication from '../../lib/Authentication';

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
var row = 0

const dbRef = FirebaseApp.database();


export class Channels extends React.Component {
    constructor() {
        super();
        this.state = {
            threads: ["LC", "CC"],
            profile: {sub: "tempProfile"},
            userID: "tempId"
        };
    }

    async componentWillMount() {
        const profile = await Authentication.getProfile();
        this.setState({profile: profile, userID: profile.sub});

        this.dbFetchThreads()
    }

    // Fetch the active threads for the current user
    dbFetchThreads() {
        dbRef.ref('Users').child(this.state.userID).child('ActiveThreads').on('value', snap => {
            var newThreads = []
            snap.forEach((child) => {
                var membersArr = child.val().members.slice()
                membersArr.splice(membersArr.indexOf(this.state.userID),1)
                newThreads.push({
                    threadID: child.val().threadID,
                    unreadCount: child.val().unreadCount,
                    members: child.val().members
                })
            });
            // set the state variable to the local array value

            // uncomment below once users have threads assigned to them in DB
            // this.setState({threads: newThreads});
        })
    }

    _renderDirectButton(userID) {
        // put logic to see if channel is active....if so do:
        // <View style={activeChannel}>
        // instead of GeneralButton
        return (
            <GeneralButton key={row++}>
                <Text style={channelButtonContentStyle}>{userID}</Text>
            </GeneralButton>
        );
    }

    render() {
        const ids = ["LC", "CC"]
        const directButtons = this.state.threads.map(this._renderDirectButton)
        console.log(this.props)

        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <GeneralButton>
                        <MaterialIcons name='people-outline' size={26} style={channelButtonContentStyle}/>
                    </GeneralButton>
                    {directButtons}
                    <AddConvoButton>
                        <MaterialIcons name='add' size={26} style={{...channelButtonContentStyle, 'color': '#FFF'}}/>
                    </AddConvoButton>
                </ScrollView>
                <GeneralButton>
                    <MaterialCommunityIcons name='alert-decagram' size={26} style={{...channelButtonContentStyle, color: 'red'}} />
                </GeneralButton>
            </View>
        );
    }
}
