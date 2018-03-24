import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  View,
  Text,
  Platform,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import { Principle } from '../../types/Lesson';
// import variables from '../../theme/native-base-theme/variables/platform';

type Props = {
  navigation: {
    state: {
      params: {
        principle: Principle,
        uri: string,
      },
    },
    goBack: any,
    navigate: any,
  },
};

export default class ViewRecordingPage extends Component<Props> {
  finishReviewing = () => {
    const { principle, uri } = this.props.navigation.state.params;
    const { navigation } = this.props;
    navigation.navigate('ShareRecording', { principle, uri });
  };

  cancel = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { uri } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Video
          ref={(ref) => {
            this.video = ref;
          }}
          style={styles.video}
          source={{ uri }}
          rate={1.0}
          volume={1.0}
          controls
          resizeMode="contain"
          onEnd={this.finishReviewing}
        />
        <View style={styles.bottomActions}>
          <TouchableOpacity onPress={this.cancel} style={styles.finish}>
            <MaterialIcon size={32} name="arrow-back" color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.finish} style={styles.finish}>
            <MaterialIcon size={32} name="arrow-forward" color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  video: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderWidth: 1,
    borderColor: '#ffffff',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: 'center',
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    display: 'none',
  },
  stop: {
    flex: 0,
    width: 64,
    height: 64,
    alignSelf: 'center',
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finish: {
    padding: 16,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};
