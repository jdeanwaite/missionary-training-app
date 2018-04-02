import React from 'react';
import { Auth, Logger, I18n } from 'aws-amplify';
import { Content, Item, Input, Text, Button, View } from 'native-base';
import { connect } from 'react-redux';
import AuthPage from './AuthPage';
import { updateAuthState } from '../../app/reducer';
import { AuthState } from '../../types/AuthState';

const logger = new Logger('ConfirmSignUp');

const Footer = (props: {
  onAuthStateChange: (authState: AuthState) => void,
  resend: () => void,
}) => {
  const { onAuthStateChange } = props;
  return (
    <View style={styles.footer}>
      <Button transparent primary onPress={() => onAuthStateChange('signIn')}>
        <Text>{I18n.get('Back to Sign In')}</Text>
      </Button>
      <Button transparent primary onPress={props.resend}>
        <Text>Resend Code</Text>
      </Button>
    </View>
  );
};

type Props = {
  authData: any,
};

class ConfirmSignUp extends AuthPage<Props> {
  state = {
    email: null,
    code: null,
  };

  constructor(props) {
    super(props);
    this.state.email = props.authData || null;
  }

  confirm = () => {
    const { email, code } = this.state;
    logger.debug(`Confirm Sign Up for ${email}`);
    Auth.confirmSignUp(email, code)
      .then(() => this.onAuthStateChange('signedUp'))
      .catch(err => this.error(err));
  };

  resend = () => {
    const { email } = this.state;
    logger.debug(`Resend Sign Up for ${email}`);
    Auth.resendSignUp(email)
      .then(() => logger.debug('code sent'))
      .catch(err => this.error(err));
  };

  render() {
    return (
      <Content padder>
        <Item>
          <Input
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
        </Item>
        <Item>
          <Input
            placeholder="Confirmation Code"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.code}
            onChangeText={text => this.setState({ code: text })}
          />
        </Item>
        <Button block onPress={this.confirm} style={styles.confirm}>
          <Text>Confirm</Text>
        </Button>
        {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
        <Footer onAuthStateChange={this.onAuthStateChange} resend={this.resend} />
      </Content>
    );
  }
}

const styles = {
  confirm: {
    marginTop: 16,
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: 16,
  },
};

const mapStateToProps = state => ({
  authData: state.authData,
});

const mapDispatchToProps = dispatch => ({
  updateAuthState: (authState, authData = null) => dispatch(updateAuthState(authState, authData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSignUp);
