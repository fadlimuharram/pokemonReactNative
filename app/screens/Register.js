import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";
import { Container, Form, Item, Input, Button } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { LogoIcon } from "../assets/svg";

export default class Register extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  toHome = () => {
    const { username, email, password, confirm_password } = this.state;
    if (confirm_password !== password) {
      return alert("Password not match");
    }

    this.props.register({
      username,
      email,
      password
    });
    this.props.navigation.navigate("Chats");
  };

  toLogin = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#58C7FF" barStyle="light-content" />
        <LinearGradient style={styles.content} colors={["#58C7FF", "#4F65B6"]}>
          <ScrollView>
            <View style={styles.logoContainer}>
              <LogoIcon size="100" color="white" />
              <Text style={styles.txtLogo}> POKEDUMB </Text>
            </View>
            <View style={styles.formContainer}>
              <KeyboardAvoidingView>
                <Form>
                  <Item>
                    <Input
                      placeholder="username"
                      placeholderTextColor="white"
                      onChangeText={username => this.setState({ username })}
                      value={this.state.username}
                    />
                  </Item>
                  <Item>
                    <Input
                      textContentType="emailAddress"
                      placeholder="email"
                      placeholderTextColor="white"
                      value={this.state.email}
                      onChangeText={email => this.setState({ email })}
                    />
                  </Item>
                  <Item>
                    <Input
                      secureTextEntry={true}
                      textContentType="password"
                      placeholder="password"
                      placeholderTextColor="white"
                      onChangeText={password => this.setState({ password })}
                      value={this.state.password}
                    />
                  </Item>
                  <Item>
                    <Input
                      secureTextEntry={true}
                      textContentType="password"
                      placeholder="confirm password"
                      placeholderTextColor="white"
                      value={this.state.confirm_password}
                      onChangeText={confirm_password =>
                        this.setState({ confirm_password })
                      }
                    />
                  </Item>
                  <Button style={styles.btnRegister} onPress={this.toHome} full>
                    <Text style={styles.txtRegister}>Register</Text>
                  </Button>
                  <TouchableOpacity onPress={this.toLogin}>
                    <Text style={styles.txtSignIn}>
                      Already have an account? Sign in
                    </Text>
                  </TouchableOpacity>
                </Form>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </LinearGradient>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  logoContainer: {
    alignSelf: "center",
    marginTop: 20
  },
  logoImg: {
    width: 150,
    height: 150,
    marginBottom: 5
  },
  txtLogo: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },
  formContainer: {
    marginTop: 50,
    padding: 10
  },
  btnRegister: {
    backgroundColor: "white",
    marginTop: 30
  },
  txtRegister: {
    color: "#4F65B6"
  },
  txtSignIn: {
    color: "white",
    marginTop: 20,
    alignSelf: "center"
  }
});
