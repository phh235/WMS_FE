export const validateImage = (imageUrl, defaultAvatar, callback) => {
  if (!imageUrl) {
    callback(defaultAvatar);
    return;
  }

  const img = new Image();
  img.src = imageUrl;

  img.onload = () => callback(imageUrl);
  img.onerror = () => callback(defaultAvatar);
};
