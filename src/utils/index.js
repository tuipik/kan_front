const prepareHeaders = (headers, { getState }) => {
  let token;
  token = getState().auth.data.tokens.access;
  if (token) {
    const bearerToken = `Bearer ${token}`;
    headers.set('authorization', bearerToken);
  }
};

export {
  prepareHeaders,
};
