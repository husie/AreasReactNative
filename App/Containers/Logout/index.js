import React, { Component } from "react";
import { Button, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import UserActions from '../../Redux/UserRedux'

class MyNotificationsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Logout',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../../Images/amco-menu.jpg')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    }};

  logout() {
    this.props.logoutUser()
    this.props.navigation.navigate('LaunchScreen')
  }

  render() {
    return (
      <Button
        onPress={() => this.logout()}
        title="Logout"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () =>
      dispatch(UserActions.logoutUser())
  }
}
export default connect(null, mapDispatchToProps)(MyNotificationsScreen)
