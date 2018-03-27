import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  View,
  Text,
  Platform,
  SafeAreaView,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';
import { Principle } from '../../types/Lesson';
// import variables from '../../theme/native-base-theme/variables/platform';

type Props = {
  navigation: {
    state: {
      params: {
        principle: Principle,
      },
    },
    goBack: any,
    navigate: any,
  },
};

const DESIRED_RATIO = '16:9';

export default class RecordPage extends Component<Props> {
  state = {
    recording: false,
  };
  finishRecording = (uri: string) => {
    const { principle } = this.props.navigation.state.params;
    const { navigation } = this.props;
    navigation.navigate('ReviewRecordingInstruction', { principle, uri });
  };

  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync();

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio = ratios.find(r => r === DESIRED_RATIO) || ratios[ratios.length - 1];

      this.setState({ ratio });
    }
  };

  beginRecording = async () => {
    if (this.camera) {
      const options = {
        quality: RNCamera.Constants.VideoQuality['720p'],
      };
      if (Platform.OS === 'ios') {
        options.codec = RNCamera.Constants.VideoCodec.H264;
      }

      this.setState({ recording: true });

      try {
        const { uri, codec } = await this.camera.recordAsync(options);
        this.finishRecording(uri);
      } catch (e) {
        this.setState({ recording: false });
        console.log('Error Recording', e);
      }
    }
  };

  stopRecording = async () => {
    if (this.camera) {
      this.camera.stopRecording();
    }
    this.setState({ recording: false });
  };

  takePicture = () => {
    console.log('snap');
  };

  cancel = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          autoFocus
          onCameraReady={this.prepareRatio}
          ratio={this.state.ratio}
          style={[styles.preview, !this.state.ratio && Platform.OS !== 'ios' && styles.hidden]}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        />
        <SafeAreaView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.topActions}>
              <TouchableOpacity onPress={this.cancel} style={styles.close}>
                <MaterialIcon size={32} name="close" color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.bottomActions}>
              {!this.state.recording && (
                <TouchableOpacity onPress={this.beginRecording} style={[styles.capture]} />
              )}
              {this.state.recording && (
                <TouchableHighlight onPress={this.stopRecording} style={styles.stop}>
                  <MaterialIcon size={64} name="stop" color="white" />
                </TouchableHighlight>
              )}
            </View>
          </View>
        </SafeAreaView>
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, .2)',
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
  close: {
    padding: 16,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
};
