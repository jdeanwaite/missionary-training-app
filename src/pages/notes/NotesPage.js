import React, { Component } from 'react';
import { View, Fab, Icon, Text, Container } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import variables from '../../theme/native-base-theme/variables/platform';

export default class NotesPage extends Component<{}> {
  onFabPress = () => {
    console.log('fab pressed');
  };

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <Text>Notess</Text>
          <Fab
            style={{ backgroundColor: variables.brandSuccess }}
            position="bottomRight"
            onPress={this.onFabPress}
          >
            <MaterialIcon name="note-add" size={25} color="#fff" />
          </Fab>
        </View>
      </Container>
    );
  }
}
