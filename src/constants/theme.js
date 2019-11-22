const theme = {
  fixedHeader: true,

  themeColor: '#27AE60',
  color: '#333333',
  colorInverted: '#ffffff',
  colorLight: '#aaaaaa',
  colorLighter: '#c4c4c4',
  colorInputBg: '#f2f2f2',

  // Prefer "Helvetica Neue" over "Helvetica", it looks better for small texts used in talk's meta data,
  // Arial is for Windows fallback
  fontFamily:
    '"Helvetica Neue", Helvetica, Arial, PingFangSC-Regular, "Microsoft YaHei", sans-serif',

  fontSize: 16,
  fontSizeMega: 34,

  gridSize: 8,

  borderRadius: 2
};

// Add more values which using above values, usually for adding variants...
Object.assign(theme, {
  fontSizeMinor: theme.fontSize / 1.14, // 14px
  fontSizeSmall: theme.fontSize / 1.3, // 12px, 16 / 1.3 = 12px
  fontSizeBig: theme.fontSize * 1.125, // 18px
  fontSizeLogo: 18
});

export default theme;
