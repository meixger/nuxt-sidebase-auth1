// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
// import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
// import EmailProvider from "next-auth/providers/email";

export default NuxtAuthHandler({
  providers: [
    //// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    // GithubProvider.default({
    //   clientId: "enter-your-client-id-here",
    //   clientSecret: "enter-your-client-secret-here",
    // }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    // CredentialsProvider({
    CredentialsProvider.default({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "foo / admin",
        },
        password: { label: "Password", type: "password", value: "bar" },
      },
      async authorize(credentials, req) {
        // TODO extend Session with custom fields https://github.com/sidebase/nuxt-auth/issues/61
        try {
          const res = await fetch("http://localhost:5000/auth/login", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              // 'Authorization': `Basic ${token}`,
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          if (res.ok) {
            var resjson = await res.json();
            return resjson;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // CallbacksOptions in node_modules\.pnpm\next-auth@4.18.0\node_modules\next-auth\core\types.d.ts
    // https://next-auth.js.org/getting-started/typescript#module-augmentation
    // https://sidebase.io/nuxt-auth/recipes/custom-session-data
    // https://github.com/sidebase/nuxt-auth/issues/148
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    async session({ session, token, user }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // jwt
    // redirect
    // signIn
  },
  events: {
    // EventCallbacks in node_modules\.pnpm\next-auth@4.18.0\node_modules\next-auth\core\types.d.ts"
  },
  // jwt: {
  //   maxAge: 60 * 20,
  // },
  session: {
    /**
     * Relative time from now in seconds when to expire the session
     * @default 2592000 // 30 days
     */
    maxAge: 60 * 20,
    /**
     * How often the session should be updated in seconds.
     * If set to `0`, session is updated every time.
     * @default 86400 // 1 day
     */
    updateAge: 86400,
  },
  secret: "HXtxpJ77ZEq+iS9omrG6cFXyyFP/ag1iUvNBCzf1m5s=", // openssl rand -base64 32
});
