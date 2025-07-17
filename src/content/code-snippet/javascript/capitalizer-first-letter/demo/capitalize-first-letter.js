export const capitalizeFirstLetter = (str) => {
  return str.replace(
    /^(\s*)([a-z])/,
    (_, spaces, letter) => spaces + letter.toUpperCase(),
  );
};
