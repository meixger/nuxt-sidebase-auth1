import { getServerSession } from "#auth";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default defineEventHandler(async (event) => {
  await delay(150);
  const session = await getServerSession(event);
  if (session) {
    return {
      api: "works",
    };
  }
  return {
    api: "works",
  };
});
