const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateAnswer = async (question) => {
  try {
    const prompt = `${question}. Return the result in JSON format like:
    {
      "question": "Your question here",
      "answer": "The correct answer here"
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    });

    const content = JSON.parse(response.choices[0].message.content);
    console.log("Generated Question:", content.question);
    console.log("Answer:", content.answer);

    return content;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

console.log("Starting OpenAI API call...");
console.log(generateAnswer("What is the capital of France?"));
