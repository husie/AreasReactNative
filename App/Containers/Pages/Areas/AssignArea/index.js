import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Tab, TabHeading, Tabs, Text, Icon, Picker, CheckBox } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker';
import PublisherActions from "../../../../Redux/PublisherRedux";
import GroupsActions from "../../../../Redux/GroupRedux";
import AreaActions from '../../../../Redux/AreaRedux'
import {connect} from "react-redux";
import Moment from "moment/moment";

class AssignArea extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Przydziel teren',
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
      publisher: null,
      group: null,
      assignDate: new Date(),
      isDateTimePickerVisible1: false,
      assign_for_group: false,
      assign_for_publisher: true
    }
  }
  _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });
  _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });
  _handleDatePicked1 = (date) => {
    this.setState({
      assignDate: date
    })
    console.log('A dateFrom has been picked: ', date);
    this._hideDateTimePicker1();
  };
  componentDidMount() {
    this.props.navigation.setParams({
      handleSave: this.assignAreaSendToServer
    });
    this.props.getPublishers()
    this.props.getGroups()
  }

  assignAreaSendToServer = () => {
    let publisher_id;
    let group_id;
    if (this.state.publisher) {
      group_id = null
      publisher_id = this.state.publisher.id
    }
    if (this.state.group) {
      publisher_id = null
      group_id = this.state.group.id
    }

    this.props.assignArea({area_id: this.state.area.id, assign_date: this.state.assignDate, group_id: group_id, publisher_id: publisher_id})
  }

  render () {
    return (
      <View>
        <Text>Teren: {this.state.area.name}</Text>
        <Text>Ostatnie opracowanie: {this.state.area.last_make}</Text>
        <View style={{flexDirection: 'row'}}>
          <CheckBox checked={this.state.assign_for_publisher} onPress={() => this.setState({assign_for_publisher: true, assign_for_group: false})} color="green"/>
          <Text style={{marginLeft: 20}}>
            Głosiciel:
          </Text>
          <CheckBox checked={this.state.assign_for_group} onPress={() => this.setState({assign_for_publisher: false, assign_for_group: true})} color="green"/>
          <Text style={{marginLeft: 20}}>
            Grupa:
          </Text>
        </View>
        {this.state.assign_for_publisher ?
          <View>
            <Picker
              note
              mode="dropdown"
              style={{}}
              selectedValue={this.state.publisher}
              onValueChange={(itemValue) => this.setState({publisher: itemValue, group: false})}>
              {this.props.publishers.map(publisher => {
                const name = publisher.first_name + ' ' + publisher.last_name

                return <Picker.Item label={name} value={publisher} />
              })}
            </Picker>
          </View>
        :
        <View />
        }
        {this.state.assign_for_group ?
          <View>
            <Picker
              note
              mode="dropdown"
              style={{}}
              selectedValue={this.state.group}
              onValueChange={(itemValue) => this.setState({publisher: false, group: itemValue})} >
              {this.props.groups.map(group => {
                const name = group.name

                return <Picker.Item label={name} value={group} />
              })}
            </Picker>
          </View>
        :
          <View/>
        }
        <TouchableOpacity onPress={this._showDateTimePicker1}>
          {this.state.assignDate ?
            <Text style={styles.buttonText}>Data przydzielenia: {Moment(new Date(this.state.assignDate)).format('DD-MM-YYYY')}</Text>
            :
            <Text style={styles.buttonText}>Data przydzielenia:</Text>
          }
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible1}
          onConfirm={this._handleDatePicked1}
          onCancel={this._hideDateTimePicker1}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});


const mapStateToProps = state => {
  return {
    publishers: state.publisher.allPublishers,
    groups: state.group.allGroups,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPublishers: () =>
      dispatch(PublisherActions.allPublishersRequest()),
    getGroups: () =>
      dispatch(GroupsActions.allGroupsRequest()),
    assignArea: (params) =>
      dispatch(AreaActions.assignArea(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AssignArea)
