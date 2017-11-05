import React, {Component} from 'react';
import {View, ScrollView, TextInput, Text} from 'react-native';
import {Pages} from 'react-native-pages';
import CreateButton from '../../lib/react-components/Button';
import ContentHeader, {HeaderStyle} from '../../lib/react-components/ContentHeader';
import {MarkdownView} from 'react-native-markdown-view';
import {MKCheckbox} from 'react-native-material-kit';

const data = [
    {type: 'heading', value: 'Activities'},
    {type: 'content', value: 'Name all the emotions you can think of.'},
    {
        type: 'response',
        value: {
            input: {
                type: 'text',
                value: 'Type your answer'
            },
            record: ''
        }
    },
    {type: 'content', value: 'What emotions do you **_rarely_** feel?'},
    {
        type: 'response',
        value: {
            input: {
                type: 'multiple',
                value: [
                    'Happy',
                    'Angry',
                    'Sad',
                    'Confused',
                    'Excited',
                    'Frustrated',
                    'Loved',
                    'Scared',
                    'Confident'
                ]
            },
            record: []
        }
    },
    {
        type: 'response',
        value: {
            input: {
                type: 'text',
                value: 'Type any others'
            },
            record: ''
        }
    }
];

const contentSpacing = {
    padding: 20, paddingBottom: 5, paddingTop: 5
};

export default class Lesson extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {
            checkValue: false
        };
        this.updateRef = this.updateRef.bind(this);
    }

    updateRef(ref) {
        this.pages = ref;
    }

    changePage(page) {
        if (this.pages) {
            this.pages.scrollToPage(page);
        }
    }

    renderInputItem(input) {
        switch (input.type) {
            case 'text':
                return <TextInput style={{height: 40, borderBottomWidth: 2, borderBottomColor: '#DDD'}}
                                  placeholder={input.value} multiline={true} returnKeyType="done"/>;
            case 'multiple':
                return (
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {input.value.map(item => (
                            <View style={{width: '33%', flexDirection: 'row'}}>
                                <MKCheckbox/>
                                <Text style={{alignSelf: 'center'}}>{item}</Text>
                            </View>
                        ))}
                    </View>
                );
        }
    }

    renderContentItem(item) {
        let renderedItem = null;

        switch (item.type) {
            case 'heading':
                renderedItem = <ContentHeader title={item.value} headerTitleStyles={HeaderStyle.SEA_GREEN}/>;
                break;
            case 'content':
                renderedItem =
                    <MarkdownView style={contentSpacing} styles={{text: {fontSize: 16}}}>{item.value}</MarkdownView>;
                break;
            case 'response':
                renderedItem = <View style={contentSpacing}>{this.renderInputItem(item.value.input)}</View>;
                break;
        }

        return (
            <View key={Math.floor(Math.random() * 1000000)}>{renderedItem}</View>
        );
    }

    render() {
        const NextPageButton = CreateButton('Next');
        const FinishLessonButton = CreateButton('Finish');

        return (
            <Pages ref={this.updateRef} scrollEnabled={false} style={{backgroundColor: '#FFF'}}>
                <ScrollView style={{flex: 1}}>
                    {data.map(this.renderContentItem.bind(this))}
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 40}}>
                        <Text style={{alignSelf: 'center', marginRight: 30}}>Page 1 of 6</Text>
                        <NextPageButton onPress={() => this.changePage(1)} />
                    </View>
                </ScrollView>
                <ScrollView style={{flex: 1}}>
                    {data.map(this.renderContentItem.bind(this))}
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 40}}>
                        <Text style={{alignSelf: 'center', marginRight: 30}}>Page 2 of 6</Text>
                        <NextPageButton onPress={() => this.changePage(2)} />
                    </View>
                </ScrollView>
                <ScrollView style={{flex: 1}}>
                    {data.map(this.renderContentItem.bind(this))}
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 40}}>
                        <Text style={{alignSelf: 'center', marginRight: 30}}>Page 3 of 6</Text>
                        <NextPageButton onPress={() => this.changePage(3)} />
                    </View>
                </ScrollView>
                <ScrollView style={{flex: 1}}>
                    {data.map(this.renderContentItem.bind(this))}
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 40}}>
                        <Text style={{alignSelf: 'center', marginRight: 30}}>Page 4 of 6</Text>
                        <NextPageButton onPress={() => this.changePage(4)} />
                    </View>
                </ScrollView>
                <ScrollView style={{flex: 1}}>
                    {data.map(this.renderContentItem.bind(this))}
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 40}}>
                        <Text style={{alignSelf: 'center', marginRight: 30}}>Page 5 of 6</Text>
                        <NextPageButton onPress={() => this.changePage(5)} />
                    </View>
                </ScrollView>
                <ScrollView style={{flex: 1}}>
                    {data.map(this.renderContentItem.bind(this))}
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 40}}>
                        <Text style={{alignSelf: 'center', marginRight: 30}}>Page 6 of 6</Text>
                        <FinishLessonButton onPress={() => this.props.navigation.goBack()} />
                    </View>
                </ScrollView>
            </Pages>
        );
    }
}