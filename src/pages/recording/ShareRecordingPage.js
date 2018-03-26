import React, { Component } from 'react';
import { Text, View, Button } from 'native-base';

type Props = {
  navigation: any,
  screenProps: any,
};

export default class ShareRecordingPage extends Component<Props> {
  dismiss = () => {
    this.props.screenProps.dismiss();
  };

  render() {
    return (
      <View padder style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text>
          Great job! You can go back and view this recording at any time. Just visit the My
          Recordings tab.
        </Text>
        <Button success block onPress={this.dismiss}>
          <Text>Finish</Text>
        </Button>
      </View>
    );
  }
}

// file:///data/data/com.missionarytrainingapp/cache/Camera/2c4903eb-c889-4a74-af3b-c203cc0bcacf.mp4
