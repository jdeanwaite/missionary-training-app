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
  screenProps: any,
};

export default class NewRecordingPage extends Component<Props> {
  goToRecordPage = () => {
    const { principle } = this.props.navigation.state.params;
    const { navigation } = this.props;
    navigation.navigate('Record', { principle });
  };

  render() {
    console.log(this.props);
    const { teach } = this.props.navigation.state.params.principle;

    return (
      <Content padder>
        <Text>While you are teaching, make sure to cover these important principles:</Text>
        <MarkdownView style={styles.markdownContainer} styles={styles.markdown}>
          {teach.pointsToTeach.markdown}
        </MarkdownView>
        <Text>When you are ready to record, press the green button.</Text>
        <View style={{ alignItems: 'center', marginTop: 32 }}>
          <TouchableOpacity style={styles.recordButton} onPress={this.goToRecordPage}>
            <MaterialIcon name="videocam" size={96} color={variables.brandSuccess} />
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
