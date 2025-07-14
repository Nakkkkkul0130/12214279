export const saveShortUrl = (code, data) => {
  localStorage.setItem(code, JSON.stringify(data));
};

export const getShortUrl = (code) => {
  const item = localStorage.getItem(code);
  return item ? JSON.parse(item) : null;
};

export const getAllShortUrls = () => {
  const urls = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.length === 6) {
      const item = localStorage.getItem(key);
      if (item) urls.push(JSON.parse(item));
    }
  }
  return urls;
};

export const addClickToUrl = (code, clickInfo) => {
  const data = getShortUrl(code);
  if (data) {
    data.clicks = [...(data.clicks || []), clickInfo];
    saveShortUrl(code, data);
  }
};
