import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Moment from 'moment'
import AppConfig from '../../../../Config/AppConfig'
import { path } from 'ramda'
import apisauce from 'apisauce'
import { withNavigation } from 'react-navigation';

// Styles
import styles from './styles'

class BansList extends Component {
  constructor (props) {
    super(props)
    const area = props.navigation.getParam('area', {})

    this.state = {
      area: area,
      bans: area.bans,
      banText: '',
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.areaAddress}>{item.address}</Text>
        <Text style={styles.areaDate}>{Moment(new Date(item.created_at)).format('DD-MM-YYYY')}</Text>
        <TouchableOpacity style={styles.buttonRemove} onPress={() => this.removeBanFromServer(item)}>
          <Text>Usuń</Text>
        </TouchableOpacity>
      </View>
    )
  }

  removeBanFromServer = (ban) => {
    const baseURL = AppConfig.apiUrl
    const api = apisauce.create({
      baseURL,
      headers: {
        'Cache-Control': 'no-cache',
        'X-Token': this.props.user.data.authentication_token
      },
      timeout: 10000
    })
    api.delete('/bans/'+ban.id)
      .then((response) => this.removeBanFromState( response, ban))
      .then((error) => console.log(error))
  }
  removeBanFromState = (response, ban) => {
    const data = path(['data'], response)
    if (data === true) {
      let allBans = [...this.state.bans];
      let filteredBans= allBans.filter(item => item.id !== ban.id);
      this.setState({ bans: filteredBans })
    }
  }

  renderHeader = () => {

    return(
      <View>
        <Text style={{flex: 0}}>Dodaj "Nie zachodzić":</Text>
        <View style={styles.headerContainer}>
          <TextInput
            style={{flex: 3, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({banText: text})}
            defaultValue={this.state.banText}
          >
          </TextInput>
          <TouchableOpacity style={{flex: 1, backgroundColor: 'green'}} onPress={() => this.createBan()}>
            <Text>Dodaj</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  createBan = () => {
    if (this.state.banText !== '') {
      const baseURL = AppConfig.apiUrl
      const api = apisauce.create({
        baseURL,
        headers: {
          'Cache-Control': 'no-cache',
          'X-Token': this.props.user.data.authentication_token
        },
        timeout: 10000
      })
      api.post('/bans', {area_id: this.state.area.id, address: this.state.banText})
        .then((response) => this.responseSuccess(response))
        .then((error) => console.log(error))
    }
  }

  responseSuccess = (response) => {
    const data = path(['data'], response)

    this.setState({
      bans: data
    })
  }

  render () {
    return (
      <View style={styles.listContent}>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.bans}
          renderItem={this._renderItem}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this._renderFooter}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(withNavigation(BansList))
