interface Data {
  [key: string]: {
    [key: string]: string;
  };
}

interface Env {
  [key: string]: KVNamespace;
}

const SECTIONS: string[] = ["abouts", "skills", "works"];

const getContent = async (env: Env, section?: string): Promise<Data | Error> => {
  const data: Data = {};
  const sections: string[] = section ? [section] : SECTIONS;

  try {
    for (let i = 0; i < sections.length; i++) {
      const key = sections[i];
      const dataSet = env[key];
      const dataList = await dataSet.list();

      for (let j = 0; j < dataList.keys.length; j++) {
        const k = dataList.keys[j].name;
        const value = await dataSet.get(k);

        if (!data[key]) {
          data[key] = {};
        }

        data[key][k] = value;
      }
    }
  } catch (error) {
    return error as Error;
  }

  return data;
};

export const onRequest: PagesFunction<Env> = async ({env, params}): Promise<Response> => {
  const section: string = params.section.toString();
  const data: Data | Error = SECTIONS.indexOf(section) > -1
    ? await getContent(env, section)
    : await getContent(env);

  return new Response(JSON.stringify({
    meta: {
      timestamp: new Date(),
      section,
    },
    data,
  }, null, 2), {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
