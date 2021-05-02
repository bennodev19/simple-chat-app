import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import ChatRoomScreen from './components/ChatRoomScreen';

import ChatsListScreen from './components/ChatsListScreen';
import AnimatedSwitch from './components/AnimatedSwitch';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AnimatedSwitch>
        {/*  <Route /> represents a path for a route in our application. */}
        <Route exact path="/chats" component={ChatsListScreen} />
        {/* :chatId can be later replaced by a string value via a parameter called 'chatId' */}
        <Route
          exact
          path="/chats/:chatId"
          // https://reactrouter.com/core/api/match
          component={({ match }: RouteComponentProps<{ chatId: string }>) => (
            <ChatRoomScreen chatId={match.params.chatId} />
          )}
        />
      </AnimatedSwitch>
      <Route exact path="/" render={redirectToChats} />
    </BrowserRouter>
  );
};

const redirectToChats = () => <Redirect to="/chats" />;

export default App;
