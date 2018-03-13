/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";
import MainStack from "../navigation/MainStack";
import getTheme from "../theme/native-base-theme/components";
import platform from "../theme/native-base-theme/variables/platform";
import { StyleProvider } from "native-base";

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
          <MainStack />
        </View>
      </StyleProvider>
    );
  }
}
