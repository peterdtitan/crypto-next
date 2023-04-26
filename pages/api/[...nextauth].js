import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  auth,
  db
} from "../../firebase.config";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";


export default NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;

          const user = await signInWithEmailAndPassword(auth, email, password, {
            returnSecureToken: true,
          });

          const userRef = collection(db, "users");
          const q = query(userRef, where("id", "==", user.user.uid));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => doc.data());
          user.user.role = data[0].role;
          user.user.profilePhoto = data[0].profilePhoto;
          user.user.firstName = data[0].firstName;
          user.user.lastName = data[0].lastName;


          if (user) {
            return user;
          } else {
            throw new Error(
              "Oops, user not found. Check details and try again!"
            );
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.profilePhoto = token.profilePhoto;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      return session;
    },
    async jwt({ token, user }) {
      if (user && user.user.uid) {
        token.id = user.user.uid;
        token.email = user.user.email;
        token.role = user.user.role;
        token.profilePhoto = user.user.profilePhoto;
        token.firstName = user.user.firstName;
        token.lastName = user.user.lastName;
      }
      return token;
    },
  },

  pages: {
    signIn: "/login",
    signUp: "/register",
    //  signOut: '/auth/signout',

    //  error: '/auth/error', // Error code passed in query string as ?error=
    //  verifyRequest: '/auth/verify-request', // (used for check email message)
    //  newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
});
