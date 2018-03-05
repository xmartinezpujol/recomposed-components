import React from 'react';
import glamorous from 'glamorous';

const UserStyle = glamorous.div({
  position: 'relative',
  background: 'lightblue',
  display: 'block',
  padding: 10,
  marginBottom: 10,
  cursor: 'pointer',
  minWidth: 80,
  minHeight: 18,
  borderRadius: 6,
});

const User = ({ name, status }) =>
  <UserStyle>{ name } — { status }</UserStyle>;

export default User;
