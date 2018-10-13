import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import { Container, Tab, TabHeading, Tabs, Text, Icon } from 'native-base'

import AllAreaList from './AllAreasList'
import UnassignedAreasList from './UnassignedAreasList'
import AssignedAreasList from './AssignedAreasList'

class Areas extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Tereny',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.openDrawer() } />
    }
  };
  allAreasHeading () {
    return (
      <TabHeading>
        <Text>Wszystkie</Text>
      </TabHeading>
    )
  }

  unassignedAreasHeading () {
    return (
      <TabHeading>
        <Text>Nieprzydzielone</Text>
      </TabHeading>
    )
  }

  assignedAreasHeading () {
    return (
      <TabHeading>
        <Text>Przydzielone</Text>
      </TabHeading>
    )
  }

  render () {
    return (
      <Container>

        <Tabs
          locked={true}
          tabBarPosition='overlayBottom'
          tabBarUnderlineStyle={{backgroundColor: 'white'}}
        >
          <Tab heading={ this.allAreasHeading() }>
            <AllAreaList />
          </Tab>
          <Tab heading={ this.unassignedAreasHeading() }>
            <UnassignedAreasList />
          </Tab>
          <Tab heading={ this.assignedAreasHeading() }>
            <AssignedAreasList />
          </Tab>
        </Tabs>

      </Container>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default Areas
