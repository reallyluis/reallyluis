interface Env {
  abouts: KVNamespace;
  skills: KVNamespace;
  works: KVNamespace;
}

export const getContent = async (context) => {
  const data: { [key: string]: { [key: string]: string } } = {
    abouts: {},
    skills: {},
    works: {},
  };

  try {
    for (const key in data) {
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
  const data: { [key: string]: { [key: string]: string } } = await getContent(context);

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
