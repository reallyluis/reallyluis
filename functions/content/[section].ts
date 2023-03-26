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

const getContent = async (context, section?: string): Promise<Data> => {
  const data: Data = {};
  const sections = section ? [section] : SECTIONS

  try {
    for (const key in sections) {
      const dataSet = context.env[key];
      const dataList = await dataSet.list();

      for (let i=0; i<dataList.keys.length; i++) {
        const k = dataList.keys[i].name;
        const value = await dataSet.get(k);

        data[key][k] = value;
      }
    }
  } catch (error) {
    console.error((error as Error)?.message);
  }

  return data;
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const params =  context.params.catchall;
  const section: string = (Array.isArray(params) ? params[0] : params).toString();
  const data: Data = SECTIONS.indexOf(section) >= 0 ?
    await getContent(context, section) :
    await getContent(context);

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
