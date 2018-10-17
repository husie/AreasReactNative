import React, { Component } from 'react'
import { Image, TextInput } from 'react-native'
import {
  Container,
  Content,
  Button,
  View,
  Text
} from 'native-base'
import { connect } from 'react-redux'
// import DevscreensButton from './DevScreens/DevscreensButton'
import UserActions from '../Redux/UserRedux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      email: this.props.user.email,
      password: this.props.user.password
    }
  }

  setNewState (state, text) {
    var newState = {}
    newState[state] = text
    this.setState(newState)
  }

  loginButton () {
    if ((this.state.email !== '') && (this.state.password !== '')) {
      this.props.loginUser(this.state.email, this.state.password)
    }
  }

  render () {
    let errorTitle = false
    if (this.props.user.error) {
      errorTitle = this.props.user.error
    }
    return (
      <Container style={styles.container}>
        <Content>

          <View style={styles.centered}>
            <Image style={styles.logo} source={require('../Images/amco-logo.png')} />
          </View>

          <View>
            <View style={styles.input1Position}>
              <Text style={styles.inputText}>
                Login/E-mail
              </Text>
            </View>
            <View style={styles.input1Size}>
              <TextInput style={styles.mainInput}
                         defaultValue={this.state.email}
                         onChangeText={(text) => this.setNewState('email', text)}
                         autoCapitalize={'none'}
                         underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>

            <View style={styles.input2Position}>
              <Text style={styles.inputText}>
                Hasło
              </Text>


            </View>

            <View style={styles.input2Size}>
              <TextInput style={styles.mainInput}
                         defaultValue={this.state.password}
                         onChangeText={(text) => this.setNewState('password', text)}
                         secureTextEntry={true}
                         autoCapitalize={'none'}
                         underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>

            <View>
              <Button style={styles.buttonLogin} onPress={() => this.loginButton()} >
                <Text style={styles.loginButtonText}>
                  Zaloguj
                </Text>
              </Button>
            </View>

            {errorTitle
              ? <Text style={{color: 'red'}}>{errorTitle}</Text>
              : <Text />
            }

          </View>
          {/*<DevscreensButton />*/}

          {this.props.user.data && !errorTitle
            ? <Text style={{color: 'red'}}>{this.props.user.data.authentication_token}</Text>
            : <Text />
          }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password) =>
      dispatch(UserActions.loginRequest(email, password))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
