import React, { Component } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { View, Fab, Text, Content } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import variables from '../../theme/native-base-theme/variables/platform';
import { Note } from '../../types/Note';

type Props = {
  notes: Note[],
  navigation: any,
};

export default class NotesPage extends Component<Props> {
  onFabPress = () => {
    const { principle } = this.props.navigation.state.params;
    const { navigation } = this.props;
    navigation.navigate('newNoteFlow', { principleId: principle.id });
  };

  render() {
    const { notes } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Content padder>
          {(!notes || !notes.length) && (
            <Text style={{ textAlign: 'center', color: 'rgba(0, 0, 0, .54)' }}>
              {"You don't have any notes yet."}
            </Text>
          )}
        </Content>
        <SafeAreaView style={{ flex: 1 }}>
          <Fab
            style={{ backgroundColor: variables.brandInfo }}
            position="bottomRight"
            onPress={this.onFabPress}
          >
            <MaterialIcon
              name="note-add"
              size={25}
              color="#fff"
              style={{ color: 'rgba(0, 0, 0, .75)' }}
            />
          </Fab>
        </SafeAreaView>
      </View>
    );
  }
}
