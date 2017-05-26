import React from 'react';
import {Container,
        Content,
        Icon,
        Card,
        CardItem,
        Text,
        Body,
        H3,
        Button,
        Header,
        Right,
        Left,
        Title,
        Fab,
        Toast,
        Form,
        Item,
        Input,
        Footer} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import WatermelonAnimation from './WatermelonAnimation';
import {View,
        Modal,
        Platform,
        Image,
        TouchableHighlight,
        DatePickerIOS} from 'react-native';

import DatePicker from 'react-native-datepicker';
var ImagePicker = require('react-native-image-picker');

export default class FeedScreen extends React.Component {
    static navigationOptions = {
        headerLeft: null,
        title: 'Feed',
    }
    state = {
        modalVisible: false,
        eventDate: new Date(),
        eventDesc: '',
    }
    options = {
        title: 'Choose Image',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    };
    setThumbnail = () => {
        ImagePicker.showImagePicker(this.options, (response) => {
            if(response.didCancel) {
                console.log('User cancelled');
            } else if(response.error) {
                console.log(response.error);
            } else if(response.customButton) {
                console.log(`User tapped on custom button ${response.customButton}`);
            } else {
                let source = {uri: response.uri};
                this.setState({
                    thubmnailSource: `data:image/jpeg;base64,${response.data}`,
                });
                Toast.show({
                    supportedOrientations : ['portrait', 'landscape'],
                    text: 'Thumbnail set.',
                    position: 'bottom',
                    buttonText: 'Okay',
                });
            }
        });
    };
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    onDateChange = (date) => {
        this.setState({eventDate: date});
    };
    setEventDesc = (textDesc) => {
        this.setState({
            eventDesc: textDesc
        })
    }
    render() {
        let noEventsView = (
            <Card>
                <CardItem>
                    <Body style={{alignItems: "center"}}>
                        <WatermelonAnimation />
                        <H3 style={{fontWeight: "bold", marginBottom: 10}}>Nothing new here</H3>
                        <Text style={{marginBottom: 50}}>Throw a party and let everyone know</Text>
                        <Button rounded danger 
                          style={{marginLeft: 100}}
                          onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                            <Text style={{textAlign: 'center'}}>Add Event</Text>
                        </Button>
                    </Body>
                </CardItem>
            </Card>
        );
        return (
            <Container>
                <Content>
                    {noEventsView}
                    {/***** Start Add New Event Modal *****/}
                    <View style={{marginTop: 22}}>
                        <Modal
                          animationType={"slide"}
                          transparent={false}
                          visible={this.state.modalVisible}
                          onRequestClose={() => alert("Press cancel.")}>
                          <Container style={{marginTop: 30}}>
                              <Content>
                                  <Form style={{marginBottom: 10}}>
                                      <Item rounded>
                                          <Input onChangeText={this.setEventDesc} placeholder="Party at Alpha Chi Omega ..." />
                                      </Item>
                                  </Form>
                                  {this.state.thubmnailSource && <Image source={this.state.avatarSource} />}
                                  <Button block info rounded onPress={this.setThumbnail} style={{marginBottom: 10}}>
                                      <Text>Set Thubmnail</Text>
                                  </Button>
                                  {Platform.OS === "android" &&(<DatePicker
                                                                style={{width: 200, marginLeft: 70, marginBottom: 20}}
                                                                date={this.state.eventDate}
                                                                mode="datetime"
                                                                placeholder="Select Date"
                                                                format="YYYY-MM-DD HH:mm"
                                                                confirmBtnText="Confirm"
                                                                cancelBtnText="Cancel"
                                                                onDateChange={this.onDateChange} />)}
                                  {Platform.OS === 'ios' && (<DatePickerIOS 
                                                            date={this.state.eventDate}
                                                            mode="datetime"
                                                            onDateChange={this.onDateChange} />)}
                                    
                                  <Grid>
                                      <Col>
                                      <Button danger iconLeft
                                        style={
                                            {
                                                marginLeft: 5
                                            }
                                        }
                                        onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        this.setState({eventDesc: ''});
                                        }}>
                                        <Icon name='trash' />
                                        <Text>Cancel</Text>
                                      </Button>
                                      </Col>
                                      <Col>
                                      <Button success iconLeft disabled={this.state.eventDesc.length <= 0}
                                        style={
                                            {
                                                marginLeft: 80,
                                            }
                                        }
                                        onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        this.setState({eventDesc: ''});
                                        }}>
                                        <Icon name='send' />
                                        <Text>Post</Text>
                                      </Button>
                                      </Col>
                                  </Grid>
                              </Content>
                          </Container>
                        </Modal>
                    </View>
                    {/***** End Add New Event Modal *****/}
                </Content>
                    <Fab
                      direction="right"
                      containerStyle={{ marginRight: 10 }}
                      style={{ backgroundColor: '#f46242' }}
                      onPress={() => {this.setModalVisible(true)}}
                      position="bottomRight">
                      <Icon name="ios-add" />
                    </Fab>
            </Container>
        );
    }
}
