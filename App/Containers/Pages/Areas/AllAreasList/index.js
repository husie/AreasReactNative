import React, { Component } from 'react'
import { View, FlatList, RefreshControl, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import AreaActions from '../../../../Redux/AreaRedux'
import AllAreaItem from '../AllAreaItem'
// Styles
import styles from './styles'

class AllAreasList extends Component {
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
    return <AllAreaItem area={item} />
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
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
    areas: state.area.allAreas
  }
};
const mapDispatchToProps = dispatch => {
  return {
    getAllAreas: () =>
      dispatch(AreaActions.allAreasRequest())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllAreasList)
