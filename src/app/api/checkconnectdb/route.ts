export const dynamic = "force-dynamic";
import connectDb from "@/lib/connectDb";
export async function GET(req:Request){
    try{
        await connectDb();
        
    }catch(error){
        console.log(error);
    }
}