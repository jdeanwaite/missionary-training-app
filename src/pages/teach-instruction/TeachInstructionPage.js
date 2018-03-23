import React, { Component } from 'react';
import { Content, Fab, View } from 'native-base';
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
    navigate: any,
  },
};

export default class TeachInstructionPage extends Component<Props> {
  newVideoRecording = () => {
    const { principle } = this.props.navigation.state.params;
    console.log('navigating');
    this.props.navigation.navigate('newRecordingFlow', { principle });
  };

  render() {
    const { teach } = this.props.navigation.state.params.principle;
    console.log('teach', teach);

    return (
      <View style={{ flex: 1 }}>
        <Content padder>
          <MarkdownView style={styles.markdownContainer} styles={styles.markdown}>
            {teach.instruction.markdown}
          </MarkdownView>
        </Content>
        <Fab
          style={{ backgroundColor: variables.brandPrimary }}
          position="bottomRight"
          onPress={this.newVideoRecording}
        >
          <MaterialIcon name="videocam" size={25} color="#fff" />
        </Fab>
      </View>
    );
  }
}

const styles = {
  markdownContainer: {
    paddingBottom: 24,
  },
  markdown: {
    heading: {
      fontWeight: '400',
    },
    heading1: {
      fontSize: 24,
    },
    heading2: {
      fontSize: 20,
      fontWeight: '500',
    },
    paragraph: {
      fontSize: 16,
    },
  },
};
