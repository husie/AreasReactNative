import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

// Styles
import styles from './styles'

class AllAreaItem extends Component {
  render () {
    return (
      <View style={styles.insideContainer}>
        <View style={styles.topContainer}>
          <View style={styles.upTextContainer}>
            <Text style={styles.containerText}>{this.props.area.symbol} {this.props.area.name}</Text>
            {this.props.area.publisher ?
              <Text style={styles.containerText}>{this.props.area.publisher.first_name} {this.props.area.publisher.last_name}</Text>
              :
              <View />
            }
            {this.props.area.group ?
              <View>
                <Text style={styles.containerText}>{this.props.area.group.name}</Text>
              </View>:
              <View />
            }
            <Text style={styles.containerText}>{this.props.area.last_make}</Text>
          </View>

          <View style={styles.downButtonsPostion}>
            <TouchableOpacity style={styles.smallContainerButton1}>
              <Text>Zgłoś</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }
}
export default withNavigation(AllAreaItem)
