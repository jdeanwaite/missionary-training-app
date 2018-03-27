import React, { Component } from 'react';
import { Content, Text, List, ListItem, Body, View, Fab } from 'native-base';
import { readDir, CachesDirectoryPath } from 'react-native-fs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import variables from '../../theme/native-base-theme/variables/platform';

type Recording = {
  title: string,
  uri: string,
};

type Props = {
  navigation: any,
};

export default class MyRecordingsPage extends Component<Props> {
  state = {
    recordings: [],
  };

  componentDidMount() {
    this.loadRecordings();
  }

  componentDidUpdate() {}

  viewRecording = (uri: string) => {
    const { principle } = this.props.navigation.state.params;
    this.props.navigation.navigate(
      'reviewRecordingFlow',
      {},
      {
        type: 'Navigate',
        routeName: 'ReviewRecordingInstruction',
        params: { principle, uri },
      },
    );
  };

  newVideoRecording = () => {
    const { principle } = this.props.navigation.state.params;
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

  async loadRecordings() {
    const recordings = await fetchFiles();
    this.setState({ recordings });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <List>
            {this.state.recordings.map((r: Recording, index) => (
              <ListItem key={r.title} onPress={() => this.viewRecording(r.uri)}>
                <Body>
                  <Text>Recording {index + 1}</Text>
                  <Text note>{r.title}</Text>
                </Body>
              </ListItem>
            ))}
          </List>
          <View padder style={{ alignItems: 'center' }}>
            {!this.state.recordings.length && (
              <Text style={{ color: 'rgba(0, 0, 0, .54)' }}>
                {"You don't have any recordings yet."}
              </Text>
            )}
          </View>
        </Content>
        <Fab
          style={{ backgroundColor: variables.brandInfo }}
          position="bottomRight"
          onPress={this.newVideoRecording}
        >
          <MaterialIcon name="videocam" size={25} style={{ color: 'rgba(0, 0, 0, .75)' }} />
        </Fab>
      </View>
    );
  }
}

async function fetchFiles(): Recording[] {
  try {
    const results = await readDir(`${CachesDirectoryPath}/Camera`);
    return results.filter(result => result.isFile()).map(result => ({
      title: `${result.mtime.toDateString()} ${result.mtime.toLocaleTimeString()}`,
      uri: result.path,
    }));
  } catch (e) {
    console.log('Error fetching files:', e);
    return [];
  }
}
