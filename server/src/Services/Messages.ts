class MessageService {
  messages = [];

  addMessage(newMessage) {
    const messageIndex = this.messages.findIndex(
      (message) => message.id === newMessage.id
    );
    if (messageIndex < 0) {
      this.messages.push(newMessage);
      return "Message added successfully";
    }
    return "Message not add";
  }

  getMessages(userJoinedTime) {
    return this.messages.filter((message) => message.time >= userJoinedTime);
  }

  getMessage(messageId) {
    const messageIndex = this.messages.findIndex(
      (message) => message.id === messageId
    );
    if (messageIndex >= 0) {
      return this.messages[messageIndex];
    }
    return "Message not found";
  }
}

export default new MessageService();
