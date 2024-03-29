
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";


const authOptions = {
  providers: [
    CredentialsProvider({
   
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {

       const { email, password } = credentials;

       try {

        await connectMongoDB();
        const user = await User.findOne({ email });

        if(!user){
          return null;
        }

        // const confirmPassword = await bcrypt.compare(user.password, password);
        // if(!confirmPassword){
        //   return null;
        // }

        return user;



       } catch (error) {
        console.log(error)
       }
       
      }
    })
  ],
  session:{
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:"/login"
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };