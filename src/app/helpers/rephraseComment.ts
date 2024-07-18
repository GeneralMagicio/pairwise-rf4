const { OpenAI } = require('openai');
const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

export const rephrase = async (comment: String) => {
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
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
	});

	return response;
};
