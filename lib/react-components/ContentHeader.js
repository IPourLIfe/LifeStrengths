import React, {Component} from 'react';
import {Text, View} from 'react-native';

export const HeaderStyle = {
    SEA_GREEN: {
        color: '#0097A7'
    },
    TANGERINE: {
        color: '#FFB100'
    }
};

export default class ContentHeader extends Component<{}> {

    constructor(props) {
        super(props);

        this.state =
            {
                headerTitleStyles: Object.assign({
                    fontSize: 16,
                    fontWeight: '500'
                }, HeaderStyle.TANGERINE, this.props.headerTitleStyles)
            }
        ;
    }

    render() {
        return (
            <View style={{borderBottomColor: '#DDD', borderBottomWidth: 1, padding: 10, paddingTop: 30}}>
                <Text style={this.state.headerTitleStyles}>{this.props.title.toUpperCase()}</Text>
            </View>
        );
    }
}