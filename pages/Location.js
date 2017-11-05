import React, {Component} from 'react';
import {View, Text, TouchableNativeFeedback, TouchableOpacity, Platform, ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import MapView from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

class LocationNavigateCard extends Component<{}> {
    openPage() {
        console.log(this.props);

        this.props.navigation.navigate('MyLocation');
    }

    render() {
        return (
            <Touchable style={{
                backgroundColor: '#FFF',
                margin: 15,
                marginLeft: 20,
                marginRight: 20,
                padding: 20,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 0
                },
                shadowRadius: 2,
                shadowOpacity: 0.3
            }} onPress={() => {
                this.openPage()
            }}>
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
            </Touchable>
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

    getRegionForCoordinates(points) {
        // init first point
        let minX = points.latitude;
        let maxX = points.latitude;
        let minY = points.longitude;
        let maxY = points.longitude;

        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;
        const deltaX = (maxX - minX);
        const deltaY = (maxY - minY);

        return {
            latitude: midX,
            longitude: midY,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
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

class NavigateBack extends Component<{}> {
    render() {
        return (
            <Touchable style={{marginRight: 20, marginTop: 2}} onPress={() => this.props.navigation.goBack()}>
                <MaterialIcons style={{color: '#FFF'}} name='arrow-back' size={28}/>
            </Touchable>
        );
    }
}

class Header extends Component<{}> {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{height: 60, backgroundColor: '#00BCD4', flexDirection: 'row', padding: 15}}>
                {this.props.back ?
                    <NavigateBack style={{width: 30, height: 30}} navigation={this.props.navigation}/> : null}
                <Text
                    style={{color: '#FFF', fontSize: 20, fontWeight: 'bold', lineHeight: 30}}>{this.props.title}</Text>
            </View>
        );
    }
}

export default Location = StackNavigator(
    {
        LocationCards: {
            screen: LocationCards,
            navigationOptions: props => ({
                header: () => (<Header title='Transportation' back={false} {...props}/>)
            })
        },
        MyLocation: {
            screen: MyLocation,
            navigationOptions: props => ({
                header: () => (<Header title='My Location' back={true} {...props}/>)
            })
        },
    }, {
        headerMode: 'float'
    }
);
