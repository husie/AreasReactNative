import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

// Styles
import styles from './styles'
import Moment from "moment/moment";

class UnassignedAreaListItem extends Component {
  render () {
    return (
      <View style={styles.insideContainer}>
        <View style={styles.topContainer}>
          <View style={styles.upTextContainer}>
            <Text style={styles.containerText}>{this.props.area.symbol} {this.props.area.name}</Text>
            <Text style={styles.containerText}>{Moment(new Date(this.props.area.last_make)).format('DD-MM-YYYY')}</Text>
          </View>

          <View style={styles.downButtonsPostion}>
            <TouchableOpacity style={styles.smallContainerButton1}>
              <Text onPress={() => this.props.navigation.navigate('AssignArea', { area: this.props.area } )}>Przydziel</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }
}
export default withNavigation(UnassignedAreaListItem)
