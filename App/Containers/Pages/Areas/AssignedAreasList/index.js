import React, { Component } from 'react'
import { View, FlatList, RefreshControl, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import AreaActions from '../../../../Redux/AreaRedux'
// Styles
import styles from './styles'
import AssignedAreaListItem from '../AssignedAreaListItem'

class AssignedAreasList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      refreshing: false,
      areas: props.areas,
      searchText: ''
    }
  }

  componentDidMount () {
    this.props.getAllAreas()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.areas) {
      this.setState({
        refreshing: false,
        areas: newProps.areas,
        searchText: ''
      })
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => {
    return <AssignedAreaListItem area={item} />
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getAllAreas()
  };

  searchFilterFunction(text) {
    const areas = this.props.areas.filter((area) => {
      if (area.publisher) {
        return (area.name.toUpperCase().includes(text.toUpperCase()) || area.symbol.toUpperCase().includes(text.toUpperCase()) || area.publisher.first_name.toUpperCase().includes(text.toUpperCase()) || area.publisher.last_name.toUpperCase().includes(text.toUpperCase()))
      }
      if (area.group) {
        return (area.name.toUpperCase().includes(text.toUpperCase()) || area.symbol.toUpperCase().includes(text.toUpperCase()) || area.group.name.toUpperCase().includes(text.toUpperCase()))
      }
      return (area.name.toUpperCase().includes(text.toUpperCase()) || area.symbol.toUpperCase().includes(text.toUpperCase()))
    });
    this.setState({
      areas: areas,
      searchText: text
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          style={{width: '100%'}}
          placeholder="Szukaj..."
          value={this.state.searchText}
          onChangeText={(text) => this.searchFilterFunction(text)}
        />
        <FlatList
          style={styles.listContent}
          keyExtractor={this._keyExtractor}
          data={this.state.areas}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    areas: state.area.assignedAreas
  }
};
const mapDispatchToProps = dispatch => {
  return {
    getAllAreas: () =>
      dispatch(AreaActions.assignedAreasRequest())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignedAreasList)
