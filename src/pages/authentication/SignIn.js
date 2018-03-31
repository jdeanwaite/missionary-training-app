import React from 'react';
import { Auth, I18n, Logger } from 'aws-amplify';
import { Container, Content, Item, Input, Button, View, Text } from 'native-base';
import { connect } from 'react-redux';
import { updateAuthState } from '../../app/reducer';
// import { AuthState } from '../../types/AuthState';

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

  error = (error) => {
    console.warn(error.stack);
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1, width: '100%' }}>
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
          <View padder style={{ paddingTop: 16 }}>
            <Button
              block
              primary
              onPress={this.signIn}
              disabled={!this.state.username || !this.state.password}
            >
              <Text>Sign In</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  updateAuthState: (authState, authData = null) => dispatch(updateAuthState(authState, authData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
