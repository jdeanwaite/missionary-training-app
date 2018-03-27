import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

type Props = {
  navigation: any,
  screenProps: any,
};

export default function DismissableTabNavigator(routes, options) {
  const TabNav = TabNavigator(routes, options);

  return class DismissableTabNav extends Component<Props> {
    static router = TabNav.router;

    render() {
      const { state, goBack } = this.props.navigation;
      const props = {
        ...this.props.screenProps,
        ...state.params,
        dismiss: () => goBack(state.key),
      };
      return <TabNav screenProps={props} navigation={this.props.navigation} />;
    }
  };
}
