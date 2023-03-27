export const loginWithGoogle = async (accessToken) => {
  const response = await fetch('/api/login/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ access_token: accessToken }),
  });
  if (!response.ok) {
    throw new Error('Failed to login with Google');
  }
  const data = await response.json();
  return data;
};
