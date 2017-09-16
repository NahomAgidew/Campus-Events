import React, { Component } from 'react';
import * as firebase from "firebase";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import PinJump from './PinJumpAnimation';

const { width, height } = Dimensions.get("window");

const background = require("../imgs/login1_bg.png");
const mark = require("../imgs/login1_mark.png");
const lockIcon = require("../imgs/login1_lock.png");
const personIcon = require("../imgs/login1_person.png");

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDisabled: true,
      schoolEmail: '',
      password: '',
    };
    firebase.initializeApp({
   });
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
     if(user) {
       this.props.startActivity();
     }
   });
  }
  validateCreds() {
    const regex = /([a-zA-Z]+)?([0-9]+)?@wsu.edu/g;
    if(this.state.schoolEmail.length > 0 && this.state.password.length > 4 && this.state.schoolEmail.match(regex) !== null) {
      this.setState({loginDisabled: false});
    }
  }
  setEmailAddress = (email) => {
    this.setState({schoolEmail: email});
    this.validateCreds();
  }
  setPassword = (pass) => {
    this.setState({password: pass});
    this.validateCreds();
  }
  joinApp = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.schoolEmail, this.state.password).catch((err) => {
      let errorCode = err.code;
      let errorMessage = err.message;
      this.props.startActivity();
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="cover">
          <View style={styles.markWrap}>
            <PinJump style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                onChangeText={this.setEmailAddress}
                placeholder="School Email Address" 
                placeholderTextColor="#FFF"
                style={styles.input}
                autoCapitalize={'none'}
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                onChangeText={this.setPassword}
                placeholderTextColor="#FFF"
                placeholder="Password" 
                style={styles.input} 
                secureTextEntry 
              />
            </View>
            <TouchableOpacity activeOpacity={.5} onPress={this.joinApp} disabled={this.state.loginDisabled} >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Join</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Version</Text>
              <TouchableOpacity activeOpacity={.5}>
                <View>
                  <Text style={styles.signupLinkText}>1.0</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
    alignItems: 'center',
    maxWidth: '75%'
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});
