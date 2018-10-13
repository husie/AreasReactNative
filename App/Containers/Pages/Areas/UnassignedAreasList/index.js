import React, { Component } from 'react'
import { View, FlatList, RefreshControl, Text } from 'react-native'
import { connect } from 'react-redux'
import AreaActions from '../../../../Redux/AreaRedux'
import UnassignedAreaItem from '../UnassignedAreaListItem'
// Styles
import styles from './styles'

class UnassignedAreasList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  componentDidMount () {
    this.props.getAllAreas()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.area) {
      this.setState({
        refreshing: false
      })
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => {
    return <UnassignedAreaItem area={item} />
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
    this.props.getAllAreas()
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listContent}
          keyExtractor={this._keyExtractor}
          data={this.props.area}
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
    area: state.area.unassignedAreas
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllAreas: () =>
      dispatch(AreaActions.unassignedAreasRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnassignedAreasList)
