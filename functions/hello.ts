interface Env {
  abouts: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const value = await context.env.abouts.get("1");

  return new Response(value);
}
