import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
import AreaActions from '../../../../Redux/AreaRedux'
import { Icon, CheckBox } from "native-base"
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment'
import BansList from '../BansList'
// Styles
import styles from './styles'

class CallMake extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Call make',
      headerLeft: <Icon name='ios-arrow-back' onPress={ () => navigation.goBack() } />,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.state.params.handleSave()}>
          <Text>Zapisz</Text>
        </TouchableOpacity>
      )
    }
  };
  constructor (props) {
    super(props)
    this.state = {
      area: props.navigation.getParam('area', {}),
      makeDate: new Date(),
      isDateTimePickerVisible1: false,
      keepArea: false,
    }
  }
  _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });
  _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });
  _handleDatePicked1 = (date) => {
    this.setState({
      makeDate: date
    })
    console.log('A dateFrom has been picked: ', date);
    this._hideDateTimePicker1();
  };

  componentDidMount () {
    this.props.navigation.setParams({
      handleSave: this.callMakeToServer
    });
  }

  callMakeToServer = () => {
    this.props.callMake({area_id: this.state.area.id, date_of_make: this.state.makeDate, keep_area: this.state.keepArea})
  }

  render () {
    return (
      <View style={styles.container}>

        <View style={{justifyContent: 'center'}}>
          <Text>Symbol: {this.state.area.symbol}</Text>
          <Text>Nazwa: {this.state.area.name}</Text>
          <Text>Przydzielony:
            {this.state.area.publisher ?
              <Text> {this.state.area.publisher.first_name} {this.state.area.publisher.last_name}</Text>
              :
              <Text />
            }
            {this.state.area.group ?
              <Text> {this.state.area.group.name}</Text>
              :
              <Text />
            }
          </Text>
          <TouchableOpacity style={styles.firstButton} onPress={this._showDateTimePicker1}>
            {this.state.makeDate ?
              <Text style={styles.buttonText}>Data opracowania: {Moment(new Date(this.state.makeDate)).format('DD-MM-YYYY')}</Text>
              :
              <Text style={styles.buttonText}>Data opracowania:</Text>
            }
          </TouchableOpacity>

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible1}
            onConfirm={this._handleDatePicked1}
            onCancel={this._hideDateTimePicker1}
          />
          <View style={styles.checkboxContainer}>
            <CheckBox checked={this.state.keepArea} onPress={()=> this.setState({keepArea: !this.state.keepArea})}/>
            <Text style={{marginLeft: 10}}>Pozostaw teren przydzielony</Text>
          </View>
        </View>

        <BansList area={this.state.area}/>

      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    callMake: (params) =>
      dispatch(AreaActions.callMake(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallMake)
