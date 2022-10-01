export interface Env {
	EMAIL_API_KEY: string;
	EMAIL_BASE_URL: string;
	EMAIL_DOMAIN: string;
	EMAIL_TEMPLATE_ID: string;
	EMAIL_TO: string;
};

interface EmailData {
	name: string;
	email: string;
	comment: string;
};

const sendEmail = async (data: EmailData, env: Env) => {
	const {name, email, comment} = data;
	const {EMAIL_API_KEY, EMAIL_DOMAIN, EMAIL_TO, EMAIL_TEMPLATE_ID, EMAIL_BASE_URL} = env;

	const opts = {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${EMAIL_API_KEY}`,
      "Content-Type": "application/json",
		},
		body: JSON.stringify({
      "from": {
        "email": `no-reply@${EMAIL_DOMAIN}`,
      },
      "personalizations": [
        {
          "to": [
            {
              "email": EMAIL_TO,
            },
          ],
          "dynamic_template_data": {
						"name": name,
						"from": email,
						"comment": comment
          },
        },
      ],
      "template_id": EMAIL_TEMPLATE_ID,
    }),
	};

	return fetch(EMAIL_BASE_URL, opts);
};

const readRequestBody = async (request: Request) => {
  const { headers } = request;
  const contentType = headers.get("content-type");

  if (contentType?.includes("application/json")) {
    const body = await request.json();

    return body;
  } else if (contentType?.includes("form")) {
    const formData = await request.formData();
    const body: {[key:string]: string | File} = {};

    for (let entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }

    return JSON.stringify(body);
  }

	return JSON.stringify({});
};

const handlePostRequest = async (request: Request, env: Env) => {
	try {
		const reqBody: any = await readRequestBody(request);
		const {name, email, comment} = JSON.parse(reqBody);
		
		if (name && email && comment) {
			await sendEmail({name, email, comment}, env);
		} else {
			throw new Error("Missing required data");
		}
	} catch (e: any) {
		return getResponse(400, e?.message || "Bad Request");
	}

	return getResponse(200, "Message sent");
};

const getResponse = (status: number = 404, message: string = "Not found") => {
	const response = JSON.stringify({status, message}, null, 2);

	return new Response(response, {
		headers: {
			"Content-Length": response.length.toString(),
			"Content-Type": "application/json; charset=UTF-8",
		},
		statusText: message,
		status,
	});
};

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const {method} = request;

		if (method != "POST") {
			return getResponse();
		}

		return handlePostRequest(request, env);
	},
};
