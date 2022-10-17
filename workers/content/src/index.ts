export interface Env {
  abouts: KVNamespace;
  skills: KVNamespace;
  works: KVNamespace;
}

const getUrlParams = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const contentType = searchParams.get("ct") || null;

  return {
    contentType,
  };
};

const getNamespace = (
  env: Env,
  contentType: string
): KVNamespace<string> | null => {
  if (env && contentType && env.hasOwnProperty(contentType)) {
    // @ts-ignore
    return env[contentType];
  }

  return null;
};

const getData = async (
  n: KVNamespace<string>
): Promise<{ [key: string]: string }> => {
  const json: { [key: string]: string } = {};
  const keys = await (await n.list()).keys;

  for (let i = 0; i < keys.length; i++) {
    if (keys[i]) {
      const key: string = keys[i].name;
      const value = await n.get(key);

      if (key && value) {
        json[key] = value;
      }
    }
  }

  return json;
};

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const cacheUrl = new URL(request.url);
    const cacheKey = new Request(cacheUrl.toString(), request);
    const cache = caches.default;

    let response = await cache.match(cacheKey);

    if (!response) {
      const { contentType }: { contentType: string | null } =
        await getUrlParams(request);
      const namespace: KVNamespace<string> | null = contentType
        ? getNamespace(env, contentType)
        : null;
      const data: { [key: string]: string } = namespace
        ? await getData(namespace)
        : {};

      response = new Response(JSON.stringify(data, null, 2), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Cache-Control": "public, max-age=86400",
        },
      });
    } else {
      console.log(`Cache hit for: ${request.url}.`);
    }

    return response;
  },
};
