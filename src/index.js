export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = request.headers.get("host") ?? "";

    const assetUrl = new URL(url);
    assetUrl.pathname = `/${host}${url.pathname}`;

    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    if (response.status === 404) {
      return new Response("Not found", { status: 404 });
    }
    return response;
  },
};
