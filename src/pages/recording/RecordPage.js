import React, { Component } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { Text, Content, View } from 'native-base';
import { MarkdownView } from 'react-native-markdown-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Principle } from '../../types/Lesson';
import variables from '../../theme/native-base-theme/variables/platform';

type Props = {
  navigation: {
    state: {
      params: {
        principle: Principle,
      },
    },
  },
};

export default class RecordPage extends Component<Props> {
  endRecording = () => {
    const { principle } = this.props.navigation.state.params;
    const { navigation } = this.props;
    navigation.navigate('RecordingReviewInstructions', { principle });
  };

  beginRecording = () => {
    console.log('should begin recording');
  };

  render() {
    return (
      <Content padder>
        <StatusBar hidden />
        <Text>Record page</Text>
      </Content>
    );
  }
}

const styles = {};
