import React from 'react';

import UserList from './components/UserList';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <UserList />
    );
  }
}

export default App;