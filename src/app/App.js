/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { StyleProvider } from 'native-base';
import Amplify from 'aws-amplify';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import getTheme from '../theme/native-base-theme/components';
import platform from '../theme/native-base-theme/variables/platform';
import reducer from './reducer';
import AppAuthProvider from '../pages/authentication/AppAuthProvider';

Amplify.Logger.LOG_LEVEL = 'DEBUG';

Amplify.configure({
  Auth: {
    // // REQUIRED - Amazon Cognito Identity Pool ID
    // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
    // REQUIRED - Amazon Cognito Region
    region: 'us-west-2',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_y8yIMg3OB',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: 'r3manogk5na8dc8mroh2fm6ur',
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
  },
});

const store = createStore(reducer);

type Props = {};

// type State = {
//   authState: AuthState,
// };

class App extends Component<Props, {}> {
  state = {};

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
          <AppAuthProvider />
        </View>
      </StyleProvider>
    );
  }
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
