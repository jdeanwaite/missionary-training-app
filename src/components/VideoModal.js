import React, { Component } from 'react';
import { View, Modal, TouchableHighlight, StyleSheet, WebView, Image } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { H2 } from 'native-base';
import GestureRecognizer from 'react-native-swipe-gestures';
import { EmbeddableVideo } from '../types/Lesson';

export default class VideoModal extends Component<{
  video: EmbeddableVideo,
}> {
  state = {
    modalVisible: false,
    width: 0,
    height: 0,
  };

  onLayout = (event) => {
    const containerWidth = event.nativeEvent.layout.width;
    this.setState({
      width: containerWidth,
      height: containerWidth * (9 / 16),
    });
  };

  onSwipeDown = () => {
    this.setState({ modalVisible: false });
  };

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    const playButtonSize = 64;
    const gestureConfig = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    return (
      <View style={{ flex: 1 }} onLayout={this.onLayout}>
        <GestureRecognizer
          onSwipeDown={this.onSwipeDown}
          style={styles.container}
          config={gestureConfig}
        >
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <View style={styles.container}>
              <View style={styles.container}>
                <WebView
                  javaScriptEnabled
                  style={{ width: '100%', height: '100%' }}
                  scalesPageToFit
                  scrollEnabled={false}
                  allowsInlineMediaPlayback={false}
                  initialScale={100}
                  source={{
                    html: `
                    <html>
                    <head>
                      <style>
                        html, body {
                          width: 100%;
                          height: 100%;
                          margin: 0;
                          padding: 0;
                          display: flex;
                          flex-flow: column nowrap;
                          justify-content: center;
                          align-items: stretch;
                          background-color: black;
                        }
                        iframe {
                          height: 100vh;
                        }
                      </style>
                    </head>
                    <body>
                      ${this.props.video.embedHtml}
                    </body>
                    </html>
                    `,
                  }}
                />
              </View>
            </View>
          </Modal>
        </GestureRecognizer>

        <H2 style={styles.videoTitle}>{this.props.video.title}</H2>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={{ marginBottom: 24 }}
        >
          <View
            style={{
              backgroundColor: 'black',
              width: this.state.width,
              height: this.state.height,
            }}
          >
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
              source={{
                uri: this.props.video.poster,
              }}
            />
            <MaterialIcon
              style={{
                position: 'absolute',
                top: this.state.height / 2 - playButtonSize / 2,
                left: this.state.width / 2 - playButtonSize / 2,
              }}
              name="play-circle-filled"
              size={playButtonSize}
              color="white"
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoTitle: {
    marginBottom: 8,
  },
});
