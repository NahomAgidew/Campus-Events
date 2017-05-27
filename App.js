import React, {Component} from 'react';
import {Container, Content, Icon, Card, CardItem, Body, H3, Button} from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import LoginScreen from './components/LoginScreen';
import FeedScreen from './components/FeedScreen';

export default class college extends Component {
    static navigationOptions = {
        title: 'College',
        header: null,
    }
    render() {
        return (
            <View style={styles.container}>
                <LoginScreen startActivity={() => this.props.navigation.navigate('Feed')} />
            </View>
        );
    }
}

const App = StackNavigator({
    Login: {screen: college},
    Feed: {
        screen: FeedScreen,
    }
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

AppRegistry.registerComponent('campusevents', () => App);
