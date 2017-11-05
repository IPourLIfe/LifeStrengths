import React, {Component} from 'react';
import {View, Text, TouchableNativeFeedback, TouchableOpacity, Platform, ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import MapView from 'react-native-maps';
import CustomHeader from '../lib/react-components/CustomNavHeader';
import {MKButton} from 'react-native-material-kit';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

class LocationNavigateCard extends Component<{}> {
    openPage() {
        console.log(this.props);

        this.props.navigation.navigate('MyLocation');
    }

    render() {
        return (
            <MKButton
                style={{
                    backgroundColor: '#FFF',
                    margin: 15,
                    marginLeft: 20,
                    marginRight: 20,
                    padding: 20,
                }}
                shadowRadius={3}
                shadowOffset={{width: 0, height: 1}}
                shadowOpacity={.4}
                shadowColor='#000'
                onPress={() => {
                    this.openPage()
                }}
            >
                <Text style={{
                    fontWeight: '500',
                    fontSize: 28,
                    marginBottom: 10,
                    color: '#0097A7'
                }}>{this.props.title}</Text>
                <Text style={{
                    fontSize: 16,
                    color: '#747474'
                }}>{this.props.subtitle}</Text>
            </MKButton>
        );
    }
}

class LocationCards extends Component<{}> {
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <LocationNavigateCard navigation={this.props.navigation} title='My Location'
                                          subtitle='Explore a map of your current location'/>
                    <LocationNavigateCard navigation={this.props.navigation} title='City Bus'
                                          subtitle='Schedules and maps for local City Utilities buses'/>
                    <LocationNavigateCard navigation={this.props.navigation} title='Greyhound'
                                          subtitle='Bus schedules and tickets for long distance travel'/>
                    <LocationNavigateCard navigation={this.props.navigation} title='OATS'
                                          subtitle='Schedules for local transit shuttle buses'/>
                </ScrollView>
            </View>
        );
    }
}

class MyLocation extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {
            region: null
        };
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            initialPosition => {
                this.setState(() => {
                    return {
                        region: {
                            ...initialPosition.coords,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03
                        }
                    };
                });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    render() {
        return (
            this.state.region !== null ? <MapView style={{flex: 1}} region={this.state.region} showsUserLocation={true}
                                                  followsUserLocation={true}/> : null
        );
    }
}

export default Location = StackNavigator(
    {
        LocationCards: {
            screen: LocationCards,
            navigationOptions: props => ({
                header: () => (<CustomHeader title='Transportation' back={false} {...props}/>)
            })
        },
        MyLocation: {
            screen: MyLocation,
            navigationOptions: props => ({
                header: () => (<CustomHeader title='My Location' back={true} {...props}/>)
            })
        },
    }, {
        headerMode: 'float'
    }
);
