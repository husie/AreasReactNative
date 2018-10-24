import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Linking, FlatList } from 'react-native';
import { Text, Icon, CheckBox } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker';
import PublisherActions from "../../../../Redux/PublisherRedux";
import GroupsActions from "../../../../Redux/GroupRedux";
import AreaActions from '../../../../Redux/AreaRedux'
import {connect} from "react-redux";
import Moment from "moment/moment";
import RNPickerSelect from 'react-native-picker-select';

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
    this.inputRefs = {};

    this.state = {
      area: props.navigation.getParam('area', {}),
      publisher: undefined,
      group: undefined,
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

  openSmsApp() {
    let body = 'sms:?body=';
    let bans = this.state.area.bans.map((ban) => (ban.address+','))
    Linking.canOpenURL(body+bans).then(supported => {
      if (supported) {
        Linking.openURL(body+bans);
      } else {
        console.log("Don't know how to open URI");
      }
    });
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.areaAddress}>{item.address}</Text>
        <Text style={styles.areaDate}>{Moment(new Date(item.created_at)).format('DD-MM-YYYY')}</Text>
      </View>
    )
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
            <RNPickerSelect
              placeholder={{
                label: 'Wybierz głosiciela...',
                value: null,
              }}
              items={this.props.publishers.map((item) => {
                return {label: (item.first_name + ' ' + item.last_name), value: item}
              })}
              onValueChange={(value) => {
                this.setState({publisher: value, group: false});
              }}
              onUpArrow={() => {
                this.inputRefs.name.focus();
              }}
              onDownArrow={() => {
                this.inputRefs.picker2.togglePicker();
              }}
              value={this.state.publisher}
              ref={(el) => {
                this.inputRefs.picker = el;
              }}
            />
          </View>
        :
        <View />
        }
        {this.state.assign_for_group ?
          <View>
            <RNPickerSelect
              placeholder={{
                label: 'Wybierz grupę...',
                value: null,
              }}
              items={this.props.groups.map((item) => {
                return {label: (item.name + ' ' + item.publisher.first_name + ' ' + item.publisher.last_name), value: item}
              })}
              onValueChange={(value) => {
                this.setState({publisher: false, group: value});
                console.log(this.state)
              }}
              onUpArrow={() => {
                this.inputRefs.name.focus();
              }}
              onDownArrow={() => {
                this.inputRefs.picker2.togglePicker();
              }}
              value={this.state.group}
              ref={(el) => {
                this.inputRefs.picker = el;
              }}
            />
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
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.area.bans}
          renderItem={this._renderItem}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this._renderFooter}
        />
        <TouchableOpacity onPress={() => this.openSmsApp()}>
          <Text>Send SMS</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  areaAddress: {
    flex: 2,
  },
  areaDate: {
    flex: 3
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
