const sizes = {
  sm: 600,
  md: 882, // leave room for Hotkey in search box
  lg: 1120
};

export default Object.keys(sizes).reduce(
  (acc, key) => ({
    ...acc,
    [key]: `@media (max-width: ${sizes[key]}px)`
  }),
  {}
);
