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
  const sections: string[] = section ? [section] : SECTIONS;

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
  const section: string = context.params.section.toString();
  console.log(section, SECTIONS.indexOf(section));
  const data: Data = SECTIONS.indexOf(section) > -1 ?
    await getContent(context, section) :
    await getContent(context);

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}