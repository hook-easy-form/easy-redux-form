export const fakeSubmit = (payload) => {
  alert(JSON.stringify(payload, null, 2));
  return {
    type: 'fake/Submit',
    payload,
  };
};