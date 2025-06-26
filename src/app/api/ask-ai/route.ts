import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Together from "together-ai";

// Initialize Together AI client
const together = new Together();

const fetchAIResponse = async (emailContent: string, question: string) => {
  try {
    // Create a completion request for the AI model
    const response = await together.chat.completions.create({
      messages: [
        { role: "user", content: `Email Content: ${emailContent} | Question: ${question}` },
      ],
      model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8", // Use the model as per your requirement
    });

    // Safely access 'choices' array and return the AI response
    if (response && response.choices && response.choices.length > 0) {
      const choice = response.choices[0];

      // Check if the message and its content are defined before accessing them
      if (choice.message && choice.message.content) {
        return choice.message.content; // Safely access the content
      } else {
        throw new Error('AI response is missing message content.');
      }
    } else {
      throw new Error('AI did not return a valid response.');
    }
  } catch (error) {
    console.error('Error interacting with Together AI:', error);
    throw new Error('AI service error');
  }
};

export async function POST(req: NextRequest) {
  try {
    // Get the request body
    const { emailContent, question } = await req.json();
    
    // Extract the token from Authorization header
    const token = req.headers.get('Authorization')?.split(' ')[1];
    
    // Check if token is provided
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    // Check if JWT_SECRET is defined in environment variables
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ message: 'Server error: JWT_SECRET is not defined.' }, { status: 500 });
    }

    // Decode the JWT token
    const user = jwt.verify(token, jwtSecret); // Decode with the JWT_SECRET
    
    // If user not found, return Unauthorized
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 401 });

    // Call the AI service to generate a response
    const aiResponse = await fetchAIResponse(emailContent, question);
    
    // Return the AI response
    return NextResponse.json({ answer: aiResponse });
  } catch (error) {
    console.error("Error in ask-ai route: ", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
