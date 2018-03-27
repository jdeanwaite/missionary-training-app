import React, { Component } from 'react';
import { Content, Fab, View } from 'native-base';
import { MarkdownView } from 'react-native-markdown-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import variables from '../../theme/native-base-theme/variables/platform';
import { Principle } from '../../types/Lesson';
import defaultCopyFont from '../../theme/text/default-copy-font';

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
    this.props.navigation.navigate(
      'newRecordingFlow',
      {},
      {
        type: 'Navigate',
        routeName: 'NewRecording',
        params: { principle },
      },
    );
  };

  render() {
    const { teach } = this.props.navigation.state.params.principle;
    console.log('teach', teach);

    return (
      <View style={{ flex: 1 }}>
        <Content>
          <MarkdownView style={styles.markdownContainer} styles={styles.markdown}>
            {teach.instruction.markdown}
          </MarkdownView>
        </Content>
        <Fab
          style={{ backgroundColor: variables.brandInfo }}
          position="bottomRight"
          onPress={this.newVideoRecording}
        >
          <MaterialIcon
            name="videocam"
            size={25}
            color="#000"
            style={{ color: 'rgba(0, 0, 0, .75)' }}
          />
        </Fab>
      </View>
    );
  }
}

const styles = {
  markdownContainer: {
    padding: 20,
    paddingBottom: 64,
  },
  markdown: {
    heading: {
      fontWeight: '500',
    },
    heading1: {
      fontSize: 24,
    },
    heading2: {
      fontSize: 20,
      fontWeight: '500',
    },
    paragraph: { ...defaultCopyFont },
    listItem: { marginBottom: 16 },
    listItemNumber: { ...defaultCopyFont },
    listItemBullet: { ...defaultCopyFont },
    listItemOrderedContent: { ...defaultCopyFont, ...{ fontWeight: '500' } },
    listItemUnorderedContent: { ...defaultCopyFont, ...{ fontWeight: '500' } },
  },
};
