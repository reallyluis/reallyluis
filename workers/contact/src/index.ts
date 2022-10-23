export interface Env {
  EMAIL_API_KEY: string;
  EMAIL_BASE_URL: string;
  EMAIL_DOMAIN: string;
  EMAIL_TEMPLATE_ID: string;
  EMAIL_TO: string;
}

interface EmailData {
  name: string;
  email: string;
  comment: string;
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

const sendEmail = async (data: EmailData, env: Env) => {
  const { name, email, comment } = data;
  const {
    EMAIL_API_KEY,
    EMAIL_DOMAIN,
    EMAIL_TO,
    EMAIL_TEMPLATE_ID,
    EMAIL_BASE_URL,
  } = env;

  const opts = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${EMAIL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: {
        email: `no-reply@${EMAIL_DOMAIN}`,
      },
      personalizations: [
        {
          to: [
            {
              email: EMAIL_TO,
            },
          ],
          dynamic_template_data: {
            name: name,
            from: email,
            comment: comment,
          },
        },
      ],
      template_id: EMAIL_TEMPLATE_ID,
    }),
  };

  return fetch(EMAIL_BASE_URL, opts);
};

const readRequestBody = async (request: Request) => {
  const { headers } = request;
  const contentType = headers.get("content-type");

  if (contentType?.includes("application/json")) {
    const body = await request.json();

    return JSON.stringify(body);
  } else if (contentType?.includes("form")) {
    const formData = await request.formData();
    const body: { [key: string]: string | File } = {};

    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }

    return JSON.stringify(body);
  }

  return JSON.stringify({});
};

const handleOptionsRequest = async (request: Request) => {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  const headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    const respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      "Access-Control-Allow-Headers":
        request.headers.get("Access-Control-Request-Headers") || "Content-Type",
    };

    return new Response(null, {
      headers: respHeaders,
    });
  }

  // Handle standard OPTIONS request.
  // If you want to allow other HTTP Methods, you can do that here.
  return new Response(null, {
    headers: {
      Allow: "GET, HEAD, POST, OPTIONS",
    },
  });
};

const handlePostRequest = async (request: Request, env: Env) => {
  try {
    const reqBody = await readRequestBody(request);
    const { name, email, comment } = JSON.parse(reqBody);

    if (name && email && comment) {
      await sendEmail({ name, email, comment }, env);
    } else {
      throw new Error("Missing required data");
    }
  } catch (error) {
    const errMessage = (error as ErrorEvent)?.message;

    return getResponse(400, errMessage || "Bad Request");
  }

  return getResponse(200, "Message sent");
};

const getResponse = (status = 405, message = "Method Not Allowed") => {
  const response = JSON.stringify({ status, message }, null, 2);

  return new Response(response, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Length": response.length.toString(),
      "Content-Type": "application/json; charset=UTF-8",
      Vary: "Origin",
    },
    statusText: message,
    status,
  });
};

export default {
  async fetch(
    request: Request,
    env: Env
    // ctx: ExecutionContext
  ): Promise<Response> {
    const { method } = request;

    if (method === "POST") {
      return handlePostRequest(request, env);
    } else if (method === "OPTIONS") {
      return handleOptionsRequest(request);
    }

    return getResponse();
  },
};
