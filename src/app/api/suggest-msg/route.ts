import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try{
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4-turbo'),
      messages,
    });

  return result.toAIStreamResponse();
  }catch(error){
    if(error instanceof OpenAI.APIError){
        const { name,status,headers }=error;
        return NextResponse.json({
            name,status,headers
        },{status})
    }
    else{
        console.error("Unexpected Error: ",error);
        throw Error;
    }
  }
}