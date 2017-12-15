import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { Loader, Card, Image, Icon, Grid } from 'semantic-ui-react';
import ChatWindow from './ChatWindow';
import fb from '../firebase';
import Firebase from 'firebase';

class ProfilePage extends Component{
  constructor(props){
    super(props);
    this.state = { loggedIn: false }
  }

  componentWillMount = () => {
    fb.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn: true})
      }
    })
  }

  render(){
    if(!this.state.loggedIn){
      return(
        <Loader active inline="centered" inverted size="massive" />
      );
    }

    fb.messaging().requestPermission();


    return(
      <Grid>
        <Grid.Column width={4}>
          <Card>
            <Image src={fb.auth().currentUser.photoURL} circular />
            <Card.Content>
              <Card.Header>
                {fb.auth().currentUser.displayName}
              </Card.Header>
              <Card.Meta>
                {fb.auth().currentUser.metadata.creationTime}
              </Card.Meta>
              <Card.Description>
                Own spiel here!
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="user" />
              0 Friends
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={2} />
        <Grid.Column width={6} >
          <ChatWindow/>
        </Grid.Column>
      </Grid>
    )
  }

}

export default withRouter(ProfilePage);
