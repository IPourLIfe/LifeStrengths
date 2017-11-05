import React, {Component} from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import FirebaseApp from './Firebase';


class CummunityMessages extends Component {
    constructor() {
        super();
        this.state = {messages:[{text:'test'}]}
    }

    componentWillMount(){
        loadMessages();
    }

    _renderItem = ({message}) => (
        <ListItem
            title={item.text}
        />
    );

    render() {
        const { inProgress, messages, error } = this.state.messages;
//        let ArrayOfMessages = Object.values(people)

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <FlatList
                    data={messages}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }

    loadMessages() {
        console.log('Preparing to check for new messages');
//        await FirebaseApp.database().ref('/test').push({'foo': 'bar'});
        const messageDb = FirebaseApp.database().ref('/community_messages');
        var newMessages = [];
        messageDb.on('value', snap => {
            snap.forEach((child) => {
                console.log('Found a new message: ' + child.val().text);
                newMessages.push({
                    orig_user_id: child.val().orig_user_id,
                    orig_user_name: child.val().orig_user_name,
                    text: child.val().text,
                    images: child.val().images
                })
                // Show an alert and an dismiss button.  This should probably update the database to show and read for this user so it doesn't show again
                // Alert.alert(
                //     'Community Message From: ' + child.val().orig_user_name,
                //     child.val().text,
                //     [
                //         {text: 'Dismiss', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                //     ]
                // )
            })
            var tempMessages = [];
            if (this.state.messages != null) {
                console.log('messages not null')
                tempMessages = this.state.messages;
            } else {
                console.log('messages IS null')
            }
            this.setState({messages: this.state.messages.concat(newMessages)})
        })
    }
}

