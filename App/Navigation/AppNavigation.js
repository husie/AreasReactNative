import { createDrawerNavigator, createSwitchNavigator, StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import Areas from '../Containers/Pages/Areas'
import Logout from '../Containers/Logout'
import CallMake from '../Containers/Pages/Areas/CallMake'

const AreasStackNavigator = StackNavigator({
  Areas: { screen: Areas },
  CallMake: { screen: CallMake }
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
