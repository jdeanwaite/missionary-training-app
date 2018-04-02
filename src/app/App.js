/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { StyleProvider } from 'native-base';
import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { graphql, ApolloProvider, compose } from 'react-apollo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import getTheme from '../theme/native-base-theme/components';
import platform from '../theme/native-base-theme/variables/platform';
import reducer from './reducer';
import AppAuthProvider from '../pages/authentication/AppAuthProvider';
import AppSync from './AppSync';

// Amplify.Logger.LOG_LEVEL = 'DEBUG';

Amplify.configure({
  Auth: {
    // // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-west-2:8e28042b-13a3-4aac-b994-e24fe68819af',
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

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AppSync.authenticationType,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
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
    <ApolloProvider client={client}>
      <Rehydrated>
        <App />
      </Rehydrated>
    </ApolloProvider>
  </Provider>
);
