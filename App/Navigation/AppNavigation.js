import { createDrawerNavigator, createSwitchNavigator, StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import Areas from '../Containers/Pages/Areas'
import Logout from '../Containers/Logout'
import CallMake from '../Containers/Pages/Areas/CallMake'
import AssignArea from '../Containers/Pages/Areas/AssignArea'

const AreasStackNavigator = StackNavigator({
  Areas: { screen: Areas },
  CallMake: { screen: CallMake },
  AssignArea: { screen: AssignArea }
});


// Drawer navigator
const DrawerNavigation = createDrawerNavigator({
  Areas: AreasStackNavigator,
  Logout: {screen: Logout}
})

// used to switch navigator after login
export default createSwitchNavigator(
  {
    LaunchScreen: LaunchScreen,
    App: DrawerNavigation,
  },
  {
    initialRouteName: 'LaunchScreen',
  }
)
