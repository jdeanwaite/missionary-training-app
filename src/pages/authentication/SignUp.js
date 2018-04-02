import React from 'react';
import { View, Text, Item, Input, Button, Content, Picker } from 'native-base';
import { Auth, I18n, Logger } from 'aws-amplify';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { AuthState } from '../../types/AuthState';
import { updateAuthState } from '../../app/reducer';
import AuthPage from './AuthPage';

const logger = new Logger('SignUp');

const Footer = (props: { onAuthStateChange: (authState: AuthState) => void }) => {
  const { onAuthStateChange } = props;
  return (
    <View style={styles.footer}>
      <Button transparent primary onPress={() => onAuthStateChange('confirmSignUp')}>
        <Text>{I18n.get('Confirm a Code')}</Text>
      </Button>
      <Button transparent primary onPress={() => onAuthStateChange('signIn')}>
        <Text>{I18n.get('Sign In')}</Text>
      </Button>
    </View>
  );
};

class SignUp extends AuthPage {
  state = {
    email: null,
    password: null,
    given_name: null,
    family_name: null,
    gender: null,
    error: null,
  };

  signUp = () => {
    const {
      email,
      password,
      given_name, // eslint-disable-line camelcase
      family_name, // eslint-disable-line camelcase
      gender,
    } = this.state;

    logger.debug(`Sign Up for ${email}`);
    logger.debug(this.state);
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        given_name,
        family_name,
        gender,
      },
    })
      .then((data) => {
        logger.debug(data);
        this.onAuthStateChange('confirmSignUp', email);
      })
      .catch(err => this.error(err));
  };

  updateGender = (gender) => {
    this.setState({ gender });
  };

  render() {
    const disabled =
      !this.state.email ||
      !this.state.family_name ||
      !this.state.gender ||
      !this.state.given_name ||
      !this.state.password;

    return (
      <Content padder>
        <Item>
          <Input
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
        </Item>
        <Item>
          <Input
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.password}
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
        </Item>
        <Item>
          <Input
            placeholder="First Name"
            autoCapitalize="words"
            autoCorrect={false}
            value={this.state.first_name}
            onChangeText={text => this.setState({ given_name: text })}
          />
        </Item>
        <Item>
          <Input
            placeholder="Last Name"
            autoCapitalize="words"
            autoCorrect={false}
            value={this.state.last_name}
            onChangeText={text => this.setState({ family_name: text })}
          />
        </Item>
        <Item>
          <Picker
            mode="dropdown"
            placeholder="Gender"
            selectedValue={this.state.gender}
            onValueChange={this.updateGender}
            placeholderStyle={Platform.OS === 'ios' ? { paddingLeft: 5 } : {}}
            textStyle={Platform.OS === 'ios' ? { paddingLeft: 5 } : {}}
            headerTitleStyle={{ color: '#fff' }}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </Item>
        <View>
          <Button block primary disabled={disabled} style={styles.signUp} onPress={this.signUp}>
            <Text>Sign Up</Text>
          </Button>
        </View>
        {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
        <Footer onAuthStateChange={this.onAuthStateChange} />
      </Content>
    );
  }
}

const styles = {
  signUp: {
    marginTop: 16,
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  error: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  updateAuthState: (authState, authData = null) => dispatch(updateAuthState(authState, authData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
