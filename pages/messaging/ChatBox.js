import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FirebaseApp from '../../lib/Firebase';

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

export default class App extends Component<{}> {
    constructor() {
        super();
        this.state = {messages: []}
    }

    componentWillMount() {
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
                    images: child.val().images,
                    time: child.val().time
                })
            })
            var tempMessages = [];
            if (this.state.messages != null) {
                console.log('messages not null')
                tempMessages = this.state.messages;
            } else {
                console.log('messages IS null')
            }
            this.setState({messages: this.state.messages.concat(newMessages)})
            console.log(this.state.messages)
        })
    }

    _renderItem(message) {
        var messageStyle = receivedMessageStyle
        var messageTimestampStyle = receivedMessageTimestampStyle
        if (message.orig_user_id = 0) {  // Replace with Auth token
            messageStyle = sentMessageStyle
            messageTimestampStyle = sentMessageTimestampStyle
        }
        return (
            <View style={messageGroup} key={Math.random() * 1000000}>
                <Text style={messageStyle}>{message.text}</Text>
                <Text style={messageTimestampStyle}>{message.time}</Text>
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
                    style={{height: this.state.scrollHeight, flex: 1, flexGrow: 1}}>
                    {this.state.messages.map(this._renderItem)}
                </ScrollView>
                <View style={{height: 80, padding: 10, borderTopWidth: 1, borderTopColor: '#DDD'}}>
                    <Text>Your Message</Text>
                    <TextInput style={{height: 40}}
                               multiline={true}/>
                    <View style={{backgroundColor: '#FFB100', height: 3, width: '100%'}}/>
                </View>
            </View>
        );
    }
    ;


}

{/*<ScrollView style={{flex: 1, flexGrow: 1}}>*/
}
{/*<View style={messageGroup}>*/
}
{/*<Text style={receivedMessageStyle}>Are you excited about your job interview today? We're all rooting for*/
}
{/*you!</Text>*/
}
{/*<Text style={receivedMessageTimestampStyle}>9:39 am</Text>*/
}
{/*</View>*/
}
{/*</ScrollView>*/
}
