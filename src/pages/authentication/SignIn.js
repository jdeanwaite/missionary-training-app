import React from 'react';
import { Auth, Logger } from 'aws-amplify';
import { StyleSheet } from 'react-native';
import { Container, Content, Item, Input, Button, View, Text } from 'native-base';
import { connect } from 'react-redux';
import { updateAuthState } from '../../app/reducer';
import AuthPage from './AuthPage';

const logger = new Logger('SignIn');

class SignIn extends AuthPage {
  state = {
    username: null,
    password: null,
    error: null,
  };

  checkContact = (user) => {
    Auth.verifiedContact(user).then((data) => {
      logger.debug('verified user attributes', data);
      if (data.verified) {
        this.onAuthStateChange('signedIn', user);
      } else {
        const userWithData = Object.assign({}, user, data);
        this.onAuthStateChange('verifyContact', userWithData);
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
          this.onAuthStateChange('confirmSignIn', user);
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          logger.debug('require new password', user.challengeParam);
          this.onAuthStateChange('requireNewPassword', user);
        } else {
          this.checkContact(user);
        }
      })
      .catch(err => this.error(err));
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
            <Button transparent primary onPress={() => this.onAuthStateChange('signUp')}>
              <Text>Create Account</Text>
            </Button>
            <Button transparent primary onPress={() => this.onAuthStateChange('forgotPassword')}>
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
