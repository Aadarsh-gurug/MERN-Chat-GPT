import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const paragraphController = async (req, res) => {
    try {
        try {
            const { text } = req.body;
            const { data } = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `write a detail paragraph about \n${text}`,
                max_tokens: 1000,
                temperature: 0.5,
            });
            if (data) {
                if (data.choices[0].text) {
                    return res.status(201).json(data.choices[0].text);
                }
            }
        } catch (err) {
            console.log(err);
            return res.status(404).json({
                message: err.message,
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
