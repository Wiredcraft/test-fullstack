const theme = {
  fixedHeader: true,

  themeColor: '#27AE60',
  color: '#333333',
  colorInverted: '#ffffff',

  // Prefer "Helvetica Neue" over "Helvetica", it looks better for small texts used in talk's meta data,
  // Arial is for Windows fallback
  fontFamily:
    '"Helvetica Neue", Helvetica, Arial, PingFangSC-Regular, "Microsoft YaHei", sans-serif',

  fontSize: 16,
  gridSize: 8,
  gapSize: 8
};

// Add more values which using above values, usually for adding variants...
Object.assign(theme, {
  fontSizeSmall: theme.fontSize / 1.3, // 12px, 16 / 1.3 = 12px
  fontSizeLogo: 18
});

export default theme;
