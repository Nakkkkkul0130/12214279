let accessToken = '';

export const getToken = () => accessToken;

export const setToken = (token) => {
  accessToken = token;
};

export const fetchAccessToken = async () => {
  const res = await fetch('http://20.244.56.144/evaluation-service/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientId: "5ed53520-3f41-462c-9cdf-038880431aff",
      clientSecret: "bCeBRsfHgTwNcqxv"
    }),
  });

  const data = await res.json();
  if (res.ok) {
    setToken(data.access_token);
    console.log(" Token fetched successfully");
  } else {
    console.error(" Token fetch failed:", data);
  }
};
