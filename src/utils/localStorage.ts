export const load = (key: string) => localStorage.getItem(key);
export const save = (key: string, value: string) =>
  localStorage.setItem(key, value);
export const remove = (key: string) => localStorage.removeItem(key);
