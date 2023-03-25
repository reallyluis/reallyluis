interface Env {
  abouts: KVNamespace;
  skills: KVNamespace;
  works: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const data: { [key: string]: { [key: string]: string } } = {
    abouts: {},
    skills: {},
    works: {},
  };
  const value = await context.env.abouts.list();

  console.log(data);

  return new Response(JSON.stringify(value, null, 2), {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
