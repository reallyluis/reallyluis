export const EMPTY_DATA = '{"abouts":{},"skills":{},"works":{}}';

export interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const buildThresholdList = () => {
  const thresholds = [0];
  const numSteps = 10;
  let i;

  for (i = 1.0; i <= numSteps; i++) {
    thresholds.push(i / numSteps);
  }

  return thresholds;
};

export const capitalizeWord = (word = "") => {
  return word.charAt(0).toUpperCase() + word.substring(1);
};

export const debounce = (
  fn: (...params: string[]) => void,
  n: number,
  immed = false
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timer: any;

  return function (this: void, ...args: string[]) {
    if (timer === undefined && immed) {
      fn.apply(this, args);
    }

    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), n);

    return timer;
  };
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

export const getObserver = (
  handleIntersect: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => void,
  options?: ObserverOptions
) => {
  return new IntersectionObserver(handleIntersect, options);
};

export const updateUrlHash = (newHash = "") => {
  const currentHash = window.location.hash.substring(1);
  const baseTitle = document.title.split(" - ")[0];

  if (currentHash !== newHash) {
    const newTitle =
      newHash === "" ? baseTitle : `${baseTitle} - ${capitalizeWord(newHash)}`;
    const newUrlPath =
      newHash === ""
        ? document.location.pathname
        : `${document.location.pathname}#${newHash}`;

    try {
      document.title = newTitle;
      history.pushState("", newTitle, newUrlPath);
    } catch (err) {
      console.log("Unable to update url hash.");
    }
  }
};
