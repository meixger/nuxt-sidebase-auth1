import { getToken } from "#auth";

export default defineEventHandler(async (event) => {
  const { take } = getQuery(event);
  const token = await getToken({ event });
  const authorization = `Bearer sub=${token?.sub}&role=${token?.role}`;
  const res = await fetch(
    `http://localhost:5000/weatherforecast?take=${take}`,
    {
      method: "get",
      headers: {
        Authorization: authorization,
      },
    }
  );
  if (!res.ok) {
    var e = await res.json();
    throw createError({
      statusCode: res.status,
      // statusMessage: res.statusText,
      statusMessage: e.message,
    });
  }
  return await res.json();
});
