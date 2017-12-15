import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Comment, Button, Form, Header, Container, TextArea, Segment } from 'semantic-ui-react';
import fb from '../firebase';
import Message from './ChatMessage'
import "../stylesheets/main.scss";

class ChatWindow extends Component{
  constructor(props){
    super(props);
    this.state = {messages: [], msg: ''};
  }

  componentWillMount = () => {
    const allChat = fb.database().ref(`chat/all`);
    const messagesCopy = [];
    allChat.on('value', (snap) => {
      messagesCopy.length = 0;
      for(const i in snap.val()){
        messagesCopy.push({
          ref: i,
          user: snap.val()[i].user,
          msg: snap.val()[i].message,
          date: snap.val()[i].time,
          uid: snap.val()[i].uid
        });
      }

      this.setState({messages: messagesCopy});
      console.log(this.state);
    });
  }

  addMessage = () => {
      let date = new Date();

      fb.database().ref(`chat/all`).push({
        user: fb.auth().currentUser.displayName,
        message: this.state.msg,
        time: date.toISOString(),
        uid: fb.auth().currentUser.uid
      }).then(() => {
        this.setState({msg: ''});
      })
  };

  isEnter = (e) => {
    if(e.key == 'Enter') {
      e.preventDefault();
      this.addMessage();
    }
  };

  updateMsg = (event) => {
    this.setState({msg: event.target.value});
  };

  render(){

    const messageList = this.state.messages.map((m) => {
      return(
        <Message key={m.ref} msg={m} />
      )
    });

    return (
      <div>
      <Segment raised className="chatWindow" >
      {messageList}
    </Segment>
    <Form>
          <TextArea autoHeight value={this.state.msg} onChange={this.updateMsg} onKeyPress={this.isEnter}/>
          <Form.Button color="blue" onClick={this.addMessage}> Send </Form.Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(ChatWindow);
