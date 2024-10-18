const lightTheme = {
  "--primary-color": "#16a34a",
  "--primary-color-hover": "#2dac5c",
  "--secondary-color": "#f4f4f5",
  "--secondary-color-hover": "#ededed",
  "--border-main-color": "#e4e4e7",
  "--main-text-color": "#16a34a",
  "--border-input-color": "#16a34a",
  "--background-color": "#fff",
  color: "#000",
  "--nav-link-color": "#000",
  "--nav-link-hover": "#f4f4f5",
  "--btn-primary-color": "#fff",
  "--tab-button-color": "#6c757d",
  "--text-light-color": "#000",
};

const darkTheme = {
  "--primary-color": "#22c55e",
  "--primary-color-hover": "#20b256",
  "--secondary-color": "#2d2f31",
  "--secondary-color-hover": "#303134",
  "--border-main-color": "#2d2f31",
  "--main-text-color": "#ffffff",
  "--border-input-color": "#ffffff",
  "--background-color": "#202124",
  color: "#fff",
  "--nav-link-color": "#fff",
  "--nav-link-hover": "#303134",
  "--btn-primary-color": "#000",
  "--tab-button-color": "#09090b",
  "--text-light-color": "#fff",
};

export const updateTheme = (isLight) => {
  const theme = isLight ? lightTheme : darkTheme;
  const root = document.documentElement;

  Object.entries(theme).forEach(([key, value]) => {
    if (key.startsWith("--")) {
      root.style.setProperty(key, value);
    } else {
      document.body.style[key] = value;
    }
  });
};
