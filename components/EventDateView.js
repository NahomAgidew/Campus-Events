import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';

export default class EventDateView extends Component {
    render () {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Col style={{backgroundColor: '#D954D7', height: 100}}></Col>
                        <Col style={{backgroundColor: '#D93735', height: 100}}></Col>
                        <Col style={{backgroundColor: '#D954D7', height: 100}}></Col>
                        <Col style={{backgroundColor: '#D93735', height: 100}}></Col>
                    </Grid>
                </Content>
            </Container>
        );
    }
}