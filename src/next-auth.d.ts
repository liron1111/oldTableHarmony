import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  key: int;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}