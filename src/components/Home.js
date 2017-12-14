import React from "react";
import { Grid, Container, Header, Icon, Button, Modal, Transition, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import Firebase from 'firebase';
import fb from "../firebase";

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {email: '', password: '', registerVisible: false};
  }

  loginGoogle = () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    fb.auth().signInWithPopup(provider)
      .then(() => {
        this.props.history.push('/profile');
      })
  };

  loginFacebook = () => {
    const provider = new Firebase.auth.FacebookAuthProvider();
    fb.auth().signInWithPopup(provider)
      .then(() => {
        this.props.history.push('/profile');
      })
  };

  registerVisibility = () => {
    this.setState({registerVisible: true});
  };

  updateEmail = (event) => {
    this.setState({email: event.target.value})
  }

  updatePassword = (event) => {
    this.setState({password: event.target.value})
  }

  login = () => {
    this.props.history.push("/profile");
    fb.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => { this.props.history.push('/profile') })
  }

  signUp = () => {
    fb.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.login);
  }

  render() {
    console.log(this.props);

    return (
      <div className="page-home">
        <Grid centered>
          <Grid.Row>
            <Header as="h1" icon inverted>
              <Icon name="home" />
              Welcome
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Button color="green" animated="vertical" onClick={this.loginGoogle}>
              <Button.Content visible>Login with Google </Button.Content>
              <Button.Content hidden>
                <Icon name="google" />
              </Button.Content>
            </Button>
            <Button color="blue" onClick={this.loginFacebook} animated="vertical">
              <Button.Content visible>Login with Facebook </Button.Content>
              <Button.Content hidden>
                <Icon name="facebook" />
              </Button.Content>
            </Button>
            <Button onClick={this.registerVisibility}> Register / Login </Button>
          </Grid.Row>
          <Grid.Row>
          <Transition visible={this.state.registerVisible} duration={500}>
            <Form inverted>
            <Form.Group widths="equal">
              <Form.Input type="text" label="email" value={this.state.email} onChange={this.updateEmail} />
              <Form.Input type="password" label="Password" value={this.state.password} onChange={this.updatePassword} />
            </Form.Group>
              <Form.Group widths="equal">
                <Form.Button onClick={this.signUp} > Sign Up </Form.Button>
                <Form.Button onClick={this.login} > Login </Form.Button>
              </Form.Group>
            </Form>
          </Transition>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Home);
