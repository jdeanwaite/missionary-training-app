import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Content, View } from 'native-base';
import { MarkdownView } from 'react-native-markdown-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import variables from '../../theme/native-base-theme/variables/platform';

type Props = {
  navigation: any,
};

export default class ReviewRecordingInstructionPage extends Component<Props> {
  next = () => {
    const { principle, uri } = this.props.navigation.state.params;
    const { navigation } = this.props;

    navigation.navigate('ViewRecording', { principle, uri });
  };

  render() {
    console.log('review props', this.props);
    const { teach } = this.props.navigation.state.params.principle;

    return (
      <Content padder>
        <Text>Now review your practice video. Did you teach the following principles?</Text>
        <MarkdownView style={styles.markdownContainer} styles={styles.markdown}>
          {teach.pointsToTeach.markdown}
        </MarkdownView>
        <Text>When you are ready to watch, press the play button.</Text>
        <View style={{ alignItems: 'center', marginTop: 32 }}>
          <TouchableOpacity style={styles.playButton} onPress={this.next}>
            <MaterialIcon name="play-arrow" size={96} color={variables.brandSuccess} />
          </TouchableOpacity>
        </View>
      </Content>
    );
  }
}

const styles = {
  markdownContainer: {
    marginBottom: 16,
    marginTop: 16,
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
  playButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: variables.brandSuccess,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
