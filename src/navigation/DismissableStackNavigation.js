import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

type Props = {
  navigation: any,
  screenProps: any,
};

export default function DismissableStackNavigator(routes, options) {
  const StackNav = StackNavigator(routes, options);

  return class DismissableStackNav extends Component<Props> {
    static router = StackNav.router;

    render() {
      const { state, goBack } = this.props.navigation;
      const props = {
        ...this.props.screenProps,
        dismiss: () => goBack(state.key),
      };
      return <StackNav screenProps={props} navigation={this.props.navigation} />;
    }
  };
}
