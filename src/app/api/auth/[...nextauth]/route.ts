import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
type GoogleProviderOptionsType = {
    clientId: string;
    clientSecret: string;
};
const GoogleProviderOBJ = {
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
} as GoogleProviderOptionsType

const handler =NextAuth( {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider(GoogleProviderOBJ),
        // ...add more providers here
    ],
});

export {handler as GET ,handler as POST}