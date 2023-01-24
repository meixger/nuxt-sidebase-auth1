import { DefaultSession } from "next-auth";
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    role?: string;
  }
}
declare module "next-auth" {
  /*
   * Returned by useSession and getSession
   */
  interface Session {
    user: { id: string; role: string } & DefaultSession["user"];
  }

  /** Passed as a parameter to the `jwt` callback */
  interface User {
    role?: string;
  }
}
