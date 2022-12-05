const fetch = require("node-fetch");

const { SECRET_KEY, EMAIL_LAMBDA } = process.env;

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // const fetch = await import("node-fetch");

  const payload = event.body;

  console.log({event})
  console.log({body: event.body})

  // const { name, email, phone, message, key } = payload;

  const name = event.body.name
  const email = event.body.email
  const message = event.body.message
  const key = event.body.key

  console.log("from payload", {name, email, message})

  const utcFromRequest = parseInt(atob(key));

  const utc = new Date().getTime();
  const difference = utc - utcFromRequest;
  const maxDifferenceAllowed = 10000;

  if (difference > maxDifferenceAllowed) {
      return { statusCode: 401, body: "Unauthorized" }
  }

  const to = process.env.TO_ADDRESS;
  const secret = SECRET_KEY;
  const url = EMAIL_LAMBDA;

  const payloadToForward = {
      from: email,
      name,
      to,
      message,
      phone: "",
      secret,
  };

  console.log(payloadToForward)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(payloadToForward),
});

if (response.ok) {
  return {statusCode: 200, body: 'email sent'}
} else if (response.status === 401) {
  return {statusCode: 401, body: 'to address not recognized' };
} else if (response.status === 500) {
  return {statusCode: 500, body: 'aws error' };
}

return {statusCode:500, body: 'unknown error'}
}

module.exports = { handler }
