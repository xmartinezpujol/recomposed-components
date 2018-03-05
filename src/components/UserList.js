import React from 'react';
import glamorous from 'glamorous';
import { compose, lifecycle, branch, renderComponent } from 'recompose';

import User from './User';
import AuthError from './AuthError';

const NoUsersMessage = () =>
  <div>There are no users to display</div>;

const UserStyle = glamorous.div({
  width: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const UNAUTHENTICATED = 401;
const UNAUTHORIZED = 403;
const errorMsgs = {
  [UNAUTHENTICATED]: 'Not Authenticated!',
  [UNAUTHORIZED]: 'Not Authorized!',
};

// Mock Service
const noUsers = [];
const users = [
  { id: 1, name: "Tim", status: "active" },
  { id: 2, name: "Bob", status: "active" },
  { id: 3, name: "Joe", status: "inactive" },
  { id: 4, name: "Jim", status: "pending" },
];
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject({ statusCode: UNAUTHENTICATED });
      // reject({ statusCode: UNAUTHORIZED })
      // resolve(noUsers);
      resolve(users);
    }, 100);
  });
}

const withUserData = lifecycle({
  componentDidMount() {
    fetchData().then(
      (users) => this.setState({ users }),
      (error) => this.setState({ error })
    );
  }
});

const hasErrorCode = ({ error }) => error && error.statusCode;
const hasNoUsers = ({ users }) => users && users.length === 0;

const nonOptimalStates = (states) =>
  compose(...states.map(state =>
    branch(state.when, renderComponent(state.render))));

const enhance = compose(
  withUserData,
  nonOptimalStates([
    { when: hasErrorCode, render: AuthError },
    { when: hasNoUsers, render: NoUsersMessage }
  ])
);

const UserList = enhance(({ users, error }) =>
  <UserStyle>
    { users && users.map((user) => <User key={user.id} {...user} />) }
  </UserStyle>
);

export default UserList;


