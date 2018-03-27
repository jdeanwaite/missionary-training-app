import React, { Component } from 'react';
import { Text, View, Button } from 'native-base';
import instructionFont from '../../theme/text/instruction-font';

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
      <View style={{ padding: 20, flex: 1 }}>
        <Text style={[instructionFont, { marginBottom: 16 }]}>
          Great job! You can go back and view this recording at any time. Just visit the My
          Recordings tab.
        </Text>
        <Button info block onPress={this.dismiss}>
          <Text>Finish</Text>
        </Button>
      </View>
    );
  }
}

// file:///data/data/com.missionarytrainingapp/cache/Camera/2c4903eb-c889-4a74-af3b-c203cc0bcacf.mp4
