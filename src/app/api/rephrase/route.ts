import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const comment = searchParams.get('comment');
	try {
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'system',
						content:
							'You will be provided with a statement, and your task is to rephrase  it.',
					},
					{
						role: 'user',
						content: comment,
					},
				],
				temperature: 1,
				max_tokens: 64,
				top_p: 1,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
				},
			},
		);

		const rephrasedText = response.data.choices[0].message.content;
		return NextResponse.json({ rephrasedText });
	} catch (error) {
		console.error('Error rephrasing text:', error);
		return null;
	}
}
