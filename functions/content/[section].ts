interface Env {
  abouts: KVNamespace;
  skills: KVNamespace;
  works: KVNamespace;
}

interface Data {
  [key: string]: {
    [key: string]: string;
  };
}

const SECTIONS: string[] = ["abouts", "skils", "works"];

const getContent = async (context, section?: string): Promise<Data | Error> => {
  const data: Data = {};
  const sections: string[] = section ? [section] : SECTIONS;

  try {
    for (let i = 0; i < sections.length; i++) {
      const key = sections[i];
      const dataSet = context.env[key];
      const dataList = await dataSet.list();

      for (let j = 0; j < dataList.keys.length; j++) {
        const k = dataList.keys[j].name;
        const value = await dataSet.get(k);

        data[key][k] = value;
      }
    }
  } catch (error) {
    return error as Error;
  }

  return data;
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const section: string = context.params.section.toString();
  const data: Data | Error = SECTIONS.indexOf(section) > -1 ?
    await getContent(context, section) :
    await getContent(context);

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
}
