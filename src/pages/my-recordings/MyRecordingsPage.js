import React, { Component } from 'react';
import { View, Text } from 'react-native';

class MyRecordingsPage extends Component<{}> {
  viewRecording = (recording) => {};

  render() {
    return (
      <View>
        <Text>My Recordings</Text>
      </View>
    );
  }
}

export default function withRecordings(props) {
  return <MyRecordingsPage props={{ ...props }} />;
}

function getRecordingsFromCache() {}
