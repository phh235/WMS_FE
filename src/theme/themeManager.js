export const updateTheme = (isDark) => {
  const rootElement = document.documentElement;

  if (isDark) {
    rootElement.classList.add("dark-theme");
  } else {
    rootElement.classList.remove("dark-theme");
  }
};
