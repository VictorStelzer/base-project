import { getTheme, getSavedThemeMode, saveThemeMode } from "./utils";

export { getTheme, getSavedThemeMode, saveThemeMode };
export const lightTheme = getTheme('light', 'unauth');
export const darkTheme = getTheme('dark', 'unauth');
