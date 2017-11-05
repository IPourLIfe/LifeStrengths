import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import moment from 'moment';
import FirebaseApp from '../../lib/Firebase';
import * as Authentication from '../../lib/Authentication';

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
const messageDb = FirebaseApp.database().ref('/community_messages');

export default class App extends Component<{}> {
    constructor() {
        super();
        this.state = {
            messages: [],
            profile: {sub:"asdjfkajsdf"},
            typingText: "a"
        };
        this._renderItem = this._renderItem.bind(this)
    }

    firstFetch() {
        var newMessages = []
        messageDb.orderByChild("date").limitToLast(20).on('value', snap => {
            snap.forEach((child) => {
                // console.log('Found a new message: ' + child.val().text);
                var inLoop = false
                this.state.messages.forEach((message) => {
                    // console.log(message.key + " = " + child.key)

                    if (child.key == message.key) {
                        inLoop = true
                    }
                })
                if (!inLoop) {
                    // console.log('added to messages')
                    newMessages.push({
                        orig_user_id: child.val().orig_user_id,
                        orig_user_name: child.val().orig_user_name,
                        text: child.val().text,
                        images: child.val().images,
                        time: child.val().time,
                        key: child.key
                    })
                }
            });
//            messageDb.off()
                this.setState({messages: newMessages});
                this.refs.scrollView.scrollTo({x:0, y:0, animated:true});

        })
    }

    incrementalFetches() {
        var newMessages = []
        messageDb.on('child_added', snap => {
            snap.forEach((child, prev) => {
                console.log('Found a new inc message: ' + child.val().text);
                console.log(child)
                var inLoop = false
                this.state.messages.forEach((message) => {
                    if (prev == message.key) {
                        inLoop = true
                    }
                })
                if (!inLoop) {
                    newMessages.push({
                        orig_user_id: child.val().orig_user_id,
                        orig_user_name: child.val().orig_user_name,
                        text: child.val().text,
                        images: child.val().images,
                        time: child.val().time
                    })
                }
            });

            this.setState({messages: this.state.messages.concat(newMessages)});
            this.refs.scrollView.scrollTo({x:0, y:0, animated:true});
        })
    }

    async componentWillMount() {
        const profile = await Authentication.getProfile();
        this.setState({profile: profile});
        console.log('Preparing to check for new messages');
        this.firstFetch()
//        this.incrementalFetches()
    }

    _renderItem(message) {
        var messageStyle = receivedMessageStyle;
        var messageTimestampStyle = receivedMessageTimestampStyle;
        if (message.orig_user_id == this.state.profile.sub) {  // Replace with Auth token
            messageStyle = sentMessageStyle;
            messageTimestampStyle = sentMessageTimestamp
        }
        const date = new Date(message.time)
        const dateString = moment(date).fromNow();

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
            <View style={{flex: 1}}>
                <View style={{
                    height: 75,
                    alignContent: 'center',
                    padding: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#DDD'
                }}>
                    <Text style={{color: '#FFB100', fontWeight: 'bold', fontSize: 20}}>Lisa Carter</Text>
                </View>
                <ScrollView
                    onContentSizeChange={this.setScrollHeight}
                    ref="scrollView"
                    style={{height: this.state.scrollHeight, flex: 1, flexGrow: 1}}>
                    {this.state.messages.map(this._renderItem)}
                </ScrollView>
                <View style={{height: 80, padding: 10, borderTopWidth: 1, borderTopColor: '#DDD'}}>
                    <Text>Your Message</Text>
                    <TextInput style={{height: 40}}
                        onSubmitEditing={this.handleEditComplete.bind(this)}
                               ref="textInput"
                               onChangeText={(text) => this.setState({typingText: text})}
                        returnKeyType="send"
                        blurOnSubmit={true}
                    />
                    <View style={{backgroundColor: '#FFB100', height: 3, width: '100%'}}/>
                </View>
                <KeyboardSpacer/>

            </View>
        );
    };

    handleEditComplete() {
        var newID = FirebaseApp.database().ref('/community_messages').push({
            'orig_user_id': this.state.profile.sub,
            'orig_user_name': this.state.profile.name,
            'text': this.state.typingText,
            'time': Date.now()
        });
        // console.log({
        //     'orig_user_id': this.state.profile.sub,
        //     'orig_user_name': this.state.profile.name,
        //     'text': this.state.typingText,
        //     'time': Date.now()
        // })
        this.refs.textInput.clear()
    }
}