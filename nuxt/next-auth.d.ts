import { DefaultSession } from "next-auth";
declare module "next-auth" {
  /*
   * Returned by useSession and getSession
   */
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}
