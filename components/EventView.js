import React, {Component} from 'react';
import * as firebase from "firebase";
import {Image,
        StyleSheet,
        View} from 'react-native';
import {
    Container,
    Content,
    Card,
    H1,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body
} from 'native-base';
import EventDateView from './EventDateView';

export default class EventView extends Component {
    constructor(props) {
        super(props);
        this.database = firebase.database();
        this.state = {
            attending: this.props.attending,
        };
    }
    addAttendees = () => {
        let uuid = this.props.uuid;
        this.database.ref(`events/${uuid}`).update({attending: this.props.attending+1});
        this.setState({attending: this.props.attending+1})
    }
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require('../imgs/app_icon.png')} />
                            <Body>
                                <Text>{this.props.user_name}</Text>
                                <Text note>{this.props.post_date}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <H1>{this.props.event_desc}</H1>
                            <Button transparent textStyle={{color: '#87838B'}} onPress={this.addAttendees} >
                                <Icon name="thumbs-up" />
                                <Text>{this.state.attending} attending</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </View>
        );
    }
}
