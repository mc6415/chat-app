import React, { Component } from 'react';
import { Loader, Divider, Button, Transition } from 'semantic-ui-react';
import fb from '../firebase';

export default class ChatMessage extends Component{
  constructor(props){
    super(props);
    this.state = {loadedUser: false};
  }

  componentWillMount = () => {
    fb.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({loadedUser: true});
      }
    })
  }

  deleteMessage = (ref) => {
    fb.database().ref(`chat/all/${ref}`).remove()
      .catch((err) => {console.log(err);})
  }

  render(){
    if(!this.state.loadedUser){
      return(
        <Loader active inline="centered" inverted size="massive" />
      )
    }
    const isYours = this.props.msg.uid === fb.auth().currentUser.uid;
    const time = new Date(this.props.msg.date);

    const className = isYours
                  ? "bubble me"
                  : "bubble you";

    return(
      <div style={{display: "inline-block", width: "100%"}}>
      <div className={className} style={{margin: "10px"}}>
        {this.props.msg.msg}
       <div className="userDetails">
         {this.props.msg.user} - {time.toLocaleString()}
       </div>
      </div>
        <Transition visible={isYours} duration={1}>
        <Button color="red" onClick={() => {this.deleteMessage(this.props.msg.ref)}} size="small"> Delete </Button>
        </Transition>
      </div>
    )
  }
}
