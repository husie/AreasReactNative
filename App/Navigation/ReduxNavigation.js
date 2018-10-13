import { NavigationActions } from 'react-navigation'
import { BackHandler } from "react-native"
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import AppNavigation from './AppNavigation'

// Create middleware and connect
export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

const ReduxAppNavigator = reduxifyNavigator(AppNavigation, 'root')

// create nav component
class ReduxNavigation extends PureComponent {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.index === 0) {
      return false
    }

    dispatch(NavigationActions.back())
    return true
  };

  render () {
    const { dispatch, nav } = this.props
    return <ReduxAppNavigator dispatch={dispatch} state={nav} />
  }
}

const mapNavStateProps = state => ({
  nav: state.nav
})
export default connect(mapNavStateProps)(ReduxNavigation)
