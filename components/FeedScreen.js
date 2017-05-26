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
        Form,
        Item,
        Input,
        Footer} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import WatermelonAnimation from './WatermelonAnimation';
import {View,
        Modal,
        Platform,
        TouchableHighlight,
        DatePickerIOS} from 'react-native';

export default class FeedScreen extends React.Component {
    static navigationOptions = {
        headerLeft: null,
        title: 'Feed',
    }
    state = {
        modalVisible: false,
        eventDate: new Date()
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    onDateChange = (date) => {
        this.setState({eventDate: date});
    };
    render() {
        let noEventsView = (
            <Card>
                <CardItem>
                    <Body style={{alignItems: "center"}}>
                        <WatermelonAnimation />
                        <H3 style={{fontWeight: "bold"}}>Nothing new here</H3>
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
                                      <Item>
                                          <Input placeholder="Details you want to add" />
                                      </Item>
                                  </Form>
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
                                        this.setModalVisible(!this.state.modalVisible)
                                        }}>
                                        <Icon name='trash' />
                                        <Text>Cancel</Text>
                                      </Button>
                                      </Col>
                                      <Col>
                                      <Button success iconLeft disabled={true}
                                        style={
                                            {
                                                marginLeft: 90
                                            }
                                        }
                                        onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible)
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
