import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import moment from 'moment';
import FirebaseApp from '../../lib/Firebase';
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

const messageDb = FirebaseApp.database().ref('/messages');

/****************************************
/  Database is structured as such:
/  + messages
/    + threadID
/      - messageID
/        -  userID
/        -  userName
/        -  text
/        -  timestamp
/  + users
/    - userID
/      - name
/      - initials
/      - auth0
/      - activeThreads
/  + unseenMsgCounts
/    - threadID
/      - userID
/      - count
****************************************/

var row = 0


export class ChatBox extends Component {
    constructor() {
        super();
        this.state = {
            threadID: 1,
            messages: [],
            profile: {sub: "asdjfkajsdf"},
            typingText: "a",
            headerNames: ""
        };
        this._renderItem = this._renderItem.bind(this)
    }

    async componentWillMount() {
        const profile = await Authentication.getProfile();
        this.setState({profile: profile});

        this.fetchHeaderNames()

        // Update call to reflect the correct threadID based on left tab selection
        // community messages are just a thread that has several members
        // direct messages are a thread with just two members
        this.dbFetch()
    }

    // Find who is on this thread and set their names to the header
    fetchHeaderNames() {
        FirebaseApp.database().ref('/messages_participants').child(this.state.threadID).once('value', snap => {
            var tempHeader = []
            snap.forEach((child) => {
                if (child.val() != this.state.profile.sub && child.val() != "userID1") {
                    FirebaseApp.database().ref('/users').child(child.val()).once('value', userSnap => {

                        // tempHeader.push(userSnap.name)
                        tempHeader.push("Lisa")
                        // set the state variable to the local array value
                        this.setState({headerNames: tempHeader.join(", ")});
                    })
                }
            });
        })
    }

    // Fetch the last 20 messages from the Firebase DB and populates the messages state array
    dbFetch() {
        messageDb.child(this.state.threadID).orderByChild("date").limitToLast(20).on('value', snap => {
            var newMessages = []
            snap.forEach((child) => {
                newMessages.push({
                    orig_user_id: child.val().orig_user_id,
                    orig_user_name: child.val().orig_user_name,
                    text: child.val().text,
                    images: child.val().images,
                    time: child.val().time,
                    key: child.key
                })
            });
            // set the state variable to the local array value
            this.setState({messages: newMessages});
            //  Scroll the list of messages to the bottom (not working  :(  )
            this.refs.scrollView.scrollToEnd();
        })
    }

    // Send the user entered message
    handleEditComplete() {
        var newID = messageDb.child(this.state.threadID).push({
            'orig_user_id': this.state.profile.sub,
            'orig_user_name': this.state.profile.name,
            'text': this.state.typingText,
            'time': Date.now()
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
            <View style={messageGroup} key={row++}>
                <Text style={messageStyle}>{message.text}</Text>
                <Text style={messageTimestampStyle}>{dateString}</Text>
            </View>
        );
    }

    render() {
        const messageBlock = this.state.messages.map(this._renderItem)
        return (
            <View style={mainGroupStyle}>
                <View style={nameHeaderStyle}>
                    <Text style={nameHeaderTextStyle}>{this.state.headerNames}</Text>
                </View>
                <ScrollView
                    onContentSizeChange={this.setScrollHeight}
                    ref="scrollView"
                    style={messageScrollViewStyle}>
                    {messageBlock}
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
