import React from 'react';
import {getLastMessage} from '../API';

class SaltybetMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Waiting for message from saltybet.com',
    }
  }

  componentDidMount() {
    this.updateMessage();
    setInterval(
      () => this.updateMessage(),
      100
    );
  }

  updateMessage() {
    this.setState({
      message: getLastMessage(),
    });
  }

  render() {
    return (
      <div className="Saltybet-Message">
        "{getLastMessage()}"
      </div>
    );
  }
}

export default SaltybetMessage;