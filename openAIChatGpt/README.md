Prerequisites
Node.js installed on your system.
An OpenAI API key.

Install dependencies:
npm install openai

Set up your OpenAI API key:
Create a .env file in the root directory.
Add your OpenAI API key like this:
OPENAI_API_KEY=your-openai-api-key

Run the script:
node your-script-file.js
The program will use the OpenAI API to answer the question "What is the capital of France?" by default.

Example Output:
Starting OpenAI API call...
Generated Question: What is the capital of France?
Answer: Paris

Error Handling
The script will log any errors encountered during the API request.
