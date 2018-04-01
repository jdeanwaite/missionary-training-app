import React from 'react';
import { Auth, I18n, Logger } from 'aws-amplify';
import { StyleSheet } from 'react-native';
import { AmplifyMessageMapEntries } from 'aws-amplify-react-native';
import { Container, Content, Item, Input, Button, View, Text } from 'native-base';
import { connect } from 'react-redux';
import { updateAuthState } from '../../app/reducer';
import { AuthState } from '../../types/AuthState';

const logger = new Logger('SignIn');

type Props = {
  updateAuthState: (authState: string) => void,
};

type State = {
  username: string,
  password: string,
  error: string,
};

class SignIn extends React.Component<Props, State> {
  state = {
    username: null,
    password: null,
    error: null,
  };

  handleStateChange = (state: AuthState) => {
    this.props.updateAuthState(state);
  };

  checkContact = (user) => {
    Auth.verifiedContact(user).then((data) => {
      logger.debug('verified user attributes', data);
      if (data.verified) {
        this.changeState('signedIn', user);
      } else {
        const userWithData = Object.assign({}, user, data);
        this.changeState('verifyContact', userWithData);
      }
    });
  };

  signIn = () => {
    const { username, password } = this.state;
    logger.debug(`Sign In for ${username}`);
    Auth.signIn(username, password)
      .then((user) => {
        logger.debug(user);
        if (user.challengeName === 'SMS_MFA') {
          this.changeState('confirmSignIn', user);
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          logger.debug('require new password', user.challengeParam);
          this.changeState('requireNewPassword', user);
        } else {
          this.checkContact(user);
        }
      })
      .catch(err => this.error(err));
  };

  error = (err) => {
    logger.debug(err);

    let msg = '';
    if (typeof err === 'string') {
      msg = err;
    } else if (err.message) {
      msg = err.message;
    } else {
      msg = JSON.stringify(err);
    }

    const map = MessageMap;
    msg = typeof map === 'string' ? map : map(msg);
    this.setState({ error: msg });
  };

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={{ flex: 1, width: '100%' }}>
          <View>
            <Item>
              <Input
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                value={this.state.username}
                onChangeText={text => this.setState({ username: text })}
              />
            </Item>
            <Item>
              <Input
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                secureTextEntry
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
            </Item>
          </View>
          <View style={{ paddingTop: 16 }}>
            <Button
              block
              primary
              onPress={this.signIn}
              disabled={!this.state.username || !this.state.password}
            >
              <Text>Sign In</Text>
            </Button>
          </View>
          {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
          <View style={styles.footer}>
            <Button transparent primary onPress={() => this.handleStateChange('signUp')}>
              <Text>Create Account</Text>
            </Button>
            <Button transparent primary>
              <Text>Forgot Password?</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    marginTop: 16,
    color: 'red',
    textAlign: 'center',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  updateAuthState: (authState, authData = null) => dispatch(updateAuthState(authState, authData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const MessageMap = (message) => {
  const match = AmplifyMessageMapEntries.filter(entry => entry[1].test(message));
  if (match.length === 0) {
    return message;
  }

  const entry = match[0];
  const msg = entry.length > 2 ? entry[2] : entry[0];

  return I18n.get(entry[0], msg);
};
