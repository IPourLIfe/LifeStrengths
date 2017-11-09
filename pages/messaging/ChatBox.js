import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import moment from 'moment';
import FirebaseApp from '../../lib/Firebase';
import 'firebase/firestore';
import * as Authentication from '../../lib/Authentication';

const mainGroupStyle = {flex: 1,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
        width: -1,
    }
}

const nameHeaderStyle = {
    height: 75,
    alignContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD'
}

const nameHeaderTextStyle = {
    color: '#FFB100',
    fontWeight: 'bold',
    fontSize: 20
}

const messageScrollViewStyle = {
    flex: 1,
    flexGrow: 1
}

const sendMessageViewStyle = {
    height: 80,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD'
}

const sendMessageTextInputStyle = {height: 40}

const afterSendMessageSpacer = {
    backgroundColor: '#FFB100',
    height: 3,
    width: '100%'
}

const messageGroup = {
    padding: 10
};

const receivedMessageStyle = {
    fontWeight: 'bold'
};

const receivedMessageTimestampStyle = {
    color: '#6a6a6a',
    fontSize: 10
};

const sentMessageStyle = {
    fontWeight: 'bold',
    color: '#00BCD4',
    textAlign: 'right'
};

const sentMessageTimestamp = {
    color: '#6a6a6a',
    fontSize: 10,
    textAlign: 'right'
};

// Use Firestore for message database
const messageFirestore = FirebaseApp.firestore().collection('community_messages')



export default class App extends Component<{}> {
    constructor() {
        super();
        this.state = {
            messages: [],
            profile: {sub: "temp profile id"},
            typingText: "text to send"
        };
        this._renderItem = this._renderItem.bind(this)
    }

    async componentWillMount() {
        const profile = await Authentication.getProfile();
        this.setState({profile: profile});

        this.dbFetch()
    }

    // Fetch the last 20 messages from the Firebase DB and populates the messages state array
    dbFetch() {
        var query = messageFirestore.orderBy('time', 'asc').limit(20)
        var observer = query.onSnapshot(snap => {
            var newMessages = []
            snap.forEach(child => {
                var data = child.data()
                newMessages.push({
                    orig_user_id: data.orig_user_id,
                    orig_user_name: data.orig_user_name,
                    text: data.text,
                    images: data.images,
                    time: data.time,
                    key: child.id
                })
            })
            // set the state variable to the local array value
            this.setState({messages: newMessages});
            //  Scroll the list of messages to the bottom (not working  :(  )
            this.refs.scrollView.scrollToEnd();
        }, err => {
            console.log('Error getting messages: ${err}')
        })
    }

    // Send the user entered message
    handleEditComplete() {
        var addDoc = messageFirestore.add({
            'orig_user_id': this.state.profile.sub,
            'orig_user_name': this.state.profile.name,
            'text': this.state.typingText,
            'time': Date.now()
        }).then(ref => {
            console.log('Added message with ID: ', ref.id)
        });

        // Clear the text input since the messsage has been sent
        this.refs.textInput.clear()
    }

    // Reusable Item renderer for each chat message
    _renderItem(message) {
        // set variables to the correct format depending on if the message was sent by this user or somebody else.
        var messageStyle = receivedMessageStyle;
        var messageTimestampStyle = receivedMessageTimestampStyle;
        if (message.orig_user_id == this.state.profile.sub) {
            messageStyle = sentMessageStyle;
            messageTimestampStyle = sentMessageTimestamp
        }

        // Convert the UNIX timestamp to a human readable format.  This will print a relative time like "just now" or "15 minutes ago"
        const date = new Date(message.time)
        const dateString = moment(date).fromNow();

        // key is added to view below to prevent warning message during runtime
        return (
            <View style={messageGroup} key={Math.random() * 1000000}>
                <Text style={messageStyle}>{message.text}</Text>
                <Text style={messageTimestampStyle}>{dateString}</Text>
            </View>
        );
    }

    render() {
        const {inProgress, messages, error} = this.state.messages;

        return (
            <View style={mainGroupStyle}>
                <View style={nameHeaderStyle}>
                    <Text style={nameHeaderTextStyle}>Lisa Carter</Text>
                </View>
                <ScrollView
                    onContentSizeChange={this.setScrollHeight}
                    ref="scrollView"
                    style={messageScrollViewStyle}>
                    {this.state.messages.map(this._renderItem)}
                </ScrollView>
                <View style={sendMessageViewStyle}>
                    <Text>Your Message</Text>
                    <TextInput style={sendMessageTextInputStyle}
                        onSubmitEditing={this.handleEditComplete.bind(this)}
                        ref="textInput"
                        onChangeText={(text) => this.setState({typingText: text})}
                        returnKeyType="send"
                        blurOnSubmit={true}
                    />
                    <View style={afterSendMessageSpacer}/>
                </View>
                <KeyboardSpacer topSpacing={-60}/>
            </View>
        );
    };
}
