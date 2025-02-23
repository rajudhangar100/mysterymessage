import connectDb from "@/lib/connectDb";
import UserModel from "@/models/User";
import { z } from "zod";
import { acceptMsgSchema } from "@/schema/acceptMsgSchema";

const UserQuerySchema=z.object({
    isAcceptingMsg:acceptMsgSchema
})

export async function POST(req:Request){
    //frontend se data nahi le sakte hai, bcs iss page mai user thodi na apna username,aur baki data dega
    //toh hume abhi server se hi data lena padega using sessions, vo req mai nahi aane wale hai
    await connectDb();
    try {
        const { username,Msg }= await req.json();
        const decodedUsername=decodeURIComponent(username);
        const result=UserQuerySchema.safeParse(Msg);
        console.log(result)
        const user= await UserModel.findOne({username:decodedUsername,isVerified:true});
        if(!user){
            console.error("User doesn't exist");
            return Response.json({
                success:false,
                message:"User doesn't exist"
            },{ status:500 })
        }
        if(user.isAcceptingMsg){
            user.isAcceptingMsg=false;
            console.log("Now, User is not accepting messages");
        }else{
            user.isAcceptingMsg=true;
            console.log("Now,User is Accepting Messages");
        }
        return Response.json({
            success:true,
            message:"User Status successfully Changed"
        },{ status:200 })
    } catch (error) {
        return Response.json({
            success:false,
            message:"Error changing status of user"
        },{ status:500 })
    }
}