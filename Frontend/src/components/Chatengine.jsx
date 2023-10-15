import { ChatEngine } from 'chat-engine';

const projectID = 'c4982b6d-dcf9-43be-93e0-ba6862e7cd51';
const userName = ''; // Change to the user's name
const userSecret = '45540392-feef-4331-bab8-56bcdc1526d4'; // Change to the user's secret key

const chatEngine = ChatEngine.create(
  { 
    projectID, 
    userName, 
    userSecret 
  },
  { 
    globalChannel: 'global-chat', 
  }
);

export default chatEngine;
