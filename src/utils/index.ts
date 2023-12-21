export const EMPTY_DATA = '{"abouts":{},"skills":{},"works":{}}';

export interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const capitalizeWord = (word = "") => {
  return word.charAt(0).toUpperCase() + word.substring(1);
};

export const getContent = async (contentAPI: string) => {
  const data: { [key: string]: { [key: string]: string } } = {
    abouts: {},
    skills: {},
    works: {},
  };

  try {
    for (const key in data) {
      const api = new URL(contentAPI);
      api.search = new URLSearchParams({ ct: key }).toString();
      const response = await fetch(api.toString());

      data[key] = await response.json();
    }
  } catch (error) {
    console.error((error as Error)?.message);
  }

  return data;
};
