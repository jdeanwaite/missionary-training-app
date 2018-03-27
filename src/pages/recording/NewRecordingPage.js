import React, { Component } from 'react';
import { TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Text, Content, View, Button, Header, Icon, Left, Body, Title } from 'native-base';
import { MarkdownView } from 'react-native-markdown-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Principle } from '../../types/Lesson';
import variables from '../../theme/native-base-theme/variables/platform';
import instructionFont from '../../theme/text/instruction-font';

type Props = {
  navigation: {
    state: {
      params: {
        principle: Principle,
      },
    },
  },
  screenProps: any,
};

export default class NewRecordingPage extends Component<Props> {
  goToRecordPage = () => {
    const { principle } = this.props.navigation.state.params;
    const { navigation } = this.props;
    navigation.navigate('Record', { principle });
  };

  // dismiss = () => {
  //   const { screenProps } = this.props;
  //   console.log('dismiss');
  //   screenProps.dismiss();
  // };

  render() {
    const { teach } = this.props.navigation.state.params.principle;

    return (
      <Content style={styles.container}>
        <Text style={styles.text}>
          While you are teaching, make sure to cover these important principles:
        </Text>
        <MarkdownView style={styles.markdownContainer} styles={styles.markdown}>
          {teach.pointsToTeach.markdown}
        </MarkdownView>
        <View>
          <Button info block onPress={this.goToRecordPage}>
            <Text>Ready!</Text>
          </Button>
        </View>
        {/* <View style={{ alignItems: 'center', marginTop: 32 }}>
          <TouchableOpacity style={styles.recordButton} onPress={this.goToRecordPage}>
            <MaterialIcon name="videocam" size={96} color={variables.brandSuccess} />
          </TouchableOpacity>
        </View> */}
      </Content>
    );
  }
}

const styles = {
  container: {
    padding: 20,
  },
  markdownContainer: {
    marginBottom: 16,
    marginTop: 16,
  },
  text: { ...instructionFont },
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
    paragraph: { ...instructionFont },
    listItem: { marginBottom: 8 },
    listItemNumber: { ...instructionFont },
    listItemBullet: { ...instructionFont },
    listItemOrderedContent: { ...instructionFont },
    listItemUnorderedContent: { ...instructionFont },
  },
  recordButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: variables.brandSuccess,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
