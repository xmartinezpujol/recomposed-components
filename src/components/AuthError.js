import React from 'react';
import glamorous from 'glamorous';

const Error = glamorous.div({
  fontWeight: 700,
  color: 'red',
});

const AuthError = ({ error }) => (
  <React.Fragment>
    {error.statusCode &&
      <Error>{errorMsgs[error.statusCode]}</Error>
    }
  </React.Fragment>
);

export default AuthError;
