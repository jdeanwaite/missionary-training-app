import React from 'React';
import { ScrollView, Alert } from 'react-native';
import { View, Content, Text, Input, Button } from 'native-base';

type Props = {
  navigation: any,
  screenProps: any,
};

export default class NewNotePage extends React.Component<Props> {
  state = {
    text: null,
    submitted: false,
  };

  updateText = (text: String) => {
    this.setState({
      text,
    });
  };

  saveNote = () => {
    const { principleId } = this.props.navigation.state.params;

    console.log('Saving note to principle:', principleId);
  };

  cancelNote = () => {
    if (!this.state.text) {
      this.props.navigation.goBack();
    } else {
      Alert.alert('Are you sure?', 'Your note will not be saved.', [
        {
          text: 'Cancel',
          onPress: null,
        },
        {
          text: 'Delete',
          onPress: () => {
            this.props.navigation.goBack();
          },
        },
      ]);
    }
  };

  render() {
    const date = new Date().toDateString();
    const disabled = this.state.submitted;
    return (
      <View style={styles.container}>
        <Text style={styles.dateTitle}>{date}</Text>
        <View style={styles.hr} />
        <Content
          style={{
            flex: 1,
            paddingLeft: 8,
            paddingRight: 8,
            paddingBottom: 32,
          }}
        >
          <Input
            multiline
            autoCapitalize="sentences"
            autoCorrect
            autoFocus
            placeholder="Start typing here."
            value={this.state.text}
            onChange={event => this.updateText(event.nativeEvent.text)}
            disabled={disabled}
            style={styles.input}
          />
        </Content>
        <View style={styles.bottomBar}>
          <Button transparent primary onPress={this.cancelNote}>
            <Text>DELETE</Text>
          </Button>
          <Button transparent dark onPress={this.saveNote}>
            <Text>SAVE</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FAF7EF',
  },
  dateTitle: {
    marginRight: 16,
    marginTop: 16,
    marginLeft: 16,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, .54)',
  },
  bottomBar: {
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    // right: 0,
    flex: 0,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderTopColor: 'rgba(0, 0, 0, .1)',
    borderTopWidth: 1,
    backgroundColor: '#FAF7EF',
  },
  input: {
    flex: 1,
  },
  hr: {
    borderBottomColor: 'rgba(0, 0, 0, .1)',
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 16,
  },
};
