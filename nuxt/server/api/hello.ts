import { getServerSession } from "#auth";
import { getToken } from "#auth";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default defineEventHandler(async (event) => {
  await delay(150);
  const session = await getServerSession(event);
  if (session) {
    const token = await getToken({ event });
    const sub = token?.sub;
    const username = session.user?.name ?? "unknown";
    const userdata = `data for user '${username}' with id (${sub})`;
    return {
      api: "works",
      userdata: userdata,
    };
  }
  return {
    api: "works",
  };
});
