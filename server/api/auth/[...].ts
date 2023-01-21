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
          placeholder: "foo",
          value: "foo",
        },
        password: { label: "Password", type: "password", value: "bar" },
      },
      async authorize(credentials, req) {
        // TODO extend Session with custom fields https://github.com/sidebase/nuxt-auth/issues/61
        if (
          credentials?.username === "foo" &&
          credentials?.password === "bar"
        ) {
          return {
            id: "22",
            name: "Foo Bar",
            email: "foo.bar@example.tld",
          };
        } else {
          return null;
        }
        // // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user;
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null;
        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      },
    }),
  ],
  callbacks: {
    // https://next-auth.js.org/getting-started/typescript#module-augmentation
    // https://sidebase.io/nuxt-auth/recipes/custom-session-data
    // https://github.com/sidebase/nuxt-auth/issues/148
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    async session({ session, token, user }) {
      session.user.id = token.sub;
      return session;
    },
  },
});
