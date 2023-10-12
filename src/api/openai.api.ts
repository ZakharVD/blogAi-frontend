export async function httpAskChatGPt(topic: string, words: string) {
  try {
    const res = await fetch(
      `https://api.openai.com/v1/engines/text-davinci-002/completions`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Please generate a text for a blog article on the topic of "${topic}" with the word limit of ${words}. This is one-way dialog, any questins will not be answered`,
          max_tokens: Number(words),
        }),
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
