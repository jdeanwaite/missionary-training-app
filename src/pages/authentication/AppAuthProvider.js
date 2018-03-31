import React from 'react';
import { Auth, Logger } from 'aws-amplify';
import { connect } from 'react-redux';
import { AuthState } from '../../types/AuthState';
import MainStack from '../../navigation/MainStack';
import { updateAuthState } from '../../app/reducer';

const logger = new Logger('AppAuthProvider');

type Props = {
  updateAuthState: (authState: AuthState, authData: any) => void,
};

class AppAuthProvider extends React.Component<Props> {
  state = {
    authState: 'loading',
    authData: null,
  };

  componentWillMount() {
    this.checkUser();
  }

  checkUser() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        const state = user ? 'signedIn' : 'signIn';
        this.handleStateChange(state, user);
      })
      .catch((err) => {
        this.handleStateChange('signIn', null);
        logger.error(err);
      });
  }

  /**
   * Updates the authState in the Redux store.
   * @param {void} state
   */
  handleStateChange(state: AuthState) {
    logger.debug(`authenticator state change ${state}`);
    let computedState = state;
    if (state === this.state.authState) {
      return;
    }

    if (state === 'signedOut') {
      computedState = 'signIn';
    }
    this.props.updateAuthState(computedState);
  }

  render() {
    return <MainStack />;
  }
}

const mapStateToProps = state => ({
  authState: state.authState,
  authData: state.authData,
});

const mapDispatchToProps = dispatch => ({
  updateAuthState: (authState, authData = null) => dispatch(updateAuthState(authState, authData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppAuthProvider);
