import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

// Styles
import styles from './styles'

class UnassignedAreaListItem extends Component {
  render () {
    return (
      <View style={styles.insideContainer}>
        <View style={styles.topContainer}>
          <View style={styles.upTextContainer}>
            <Text style={styles.containerText}>{this.props.area.symbol} {this.props.area.name}</Text>
            <Text style={styles.containerText}>{this.props.area.last_make}</Text>
          </View>

          <View style={styles.downButtonsPostion}>
            <TouchableOpacity style={styles.smallContainerButton1}>
              <Text>Przydziel</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }
}
export default withNavigation(UnassignedAreaListItem)
