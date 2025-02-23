import connectDb from "@/lib/connectDb";
import UserModel from "@/models/User";

export async function GET(req:Request){
    await connectDb();
    try {
        //code for getting params from req
        const { searchParams } = new URL(req.url);
        const queryParams ={
            username:searchParams.get('username')
        }
        const user= await UserModel.findOne({username:queryParams});
        if(!user){
            return Response.json({
                success:false,
                message:"User is not registered"
            },{ status:500 })
        }
        const UserAcceptingMsg=user.isAcceptingMsg;
        if(UserAcceptingMsg){
            console.log("User is Accepting Messages");
            return Response.json({
                success:true,
                message:"User is Accepting Messages"
            },{ status:500 })
        }
        return Response.json({
            success:false,
            message:"User is not Accepting Messages"
        },{ status:500 })
    } catch (error) {
        console.error("Error checking status of the User " ,error);
        return Response.json({
            success:false,
            message:"Error checking status of the User"
        },{ status:500 })
    }
}