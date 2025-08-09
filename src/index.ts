export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // this is called when no route matches.
    return new Response(JSON.stringify({ result: 'ok' }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'max-age=60, must-revalidate',
      },
    });
  },
};
