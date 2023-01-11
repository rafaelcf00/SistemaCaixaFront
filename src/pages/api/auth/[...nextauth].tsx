import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "Iv1.8a94ccb7c24487a4",
      clientSecret: "1c38270a20ede34172a12d1caa6971f3e66e87c2",
    }),
    Auth0Provider({
      clientId: "1tcAN9JR3tkkgloXQ12drhKQYF8GTeCb",
      clientSecret:
        "_meXlQIvCTFSbUZYHdELVBBsGOECwDhrB7YlRxCR7vpXiNhyfYRJKWOCZgra06CQ",
      issuer: "https://dev-6fml8eeqng4s4ofk.us.auth0.com",
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
