import { useEffect, useState } from "react";
import useSettings from "./useSettings";
import { Configuration, OpenAIApi } from "openai";
import { ChatGPTPrompt } from "@utils/types";
import { getMaxTokensForModel } from "@utils/helpers";

export default function useChatGPT() {
  const { isLoading, error, getSetting } = useSettings();
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [openAi, setOpenAi] = useState<OpenAIApi | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  useEffect(() => {
    if(isLoading || error) {
      console.log("useSettings: Loading or error");
      return;
    }

    console.log("useSettings: Loaded settings");

    const apiKey = getSetting("ChatGPTApiKey");
    setApiKey(apiKey ? apiKey.value : "");
    const configuration = new Configuration({
      apiKey: apiKey ? apiKey.value : "",
    });
    
    setOpenAi(new OpenAIApi(configuration));
  }, [isLoading, error]);
  
  async function submitPrompt(prompt: ChatGPTPrompt) {
    if(!openAi) {
      //Pop error message to use letting them know to add the OpenAI key
      console.log("OpenAI key not set");
      return "OpenAI key not set";
    }
    
    let response = "";
    setLoadingResponse(true);

    let prompts = [
      /*{"role": "system", "content": "Use HTML tags to format responses, include p tags for paragraphs, emphasis tags for emphasis, and so on. Don't use p tags for only one sentence or one paragraph"},*/
      {"role": "user", "content": prompt.prompt}];

    if(prompt.preprompt) {
      prompts.unshift({"role": "system", "content": prompt.preprompt});
    }

    try {
      const result = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: prompt.model ?? "gpt-3.5-turbo",
          messages: prompts,
          temperature: prompt.temperature ?? 0.5,
        })
      })
  
      const data = await result.json();
      console.log(response = data.choices[0].message.content || "");
      response = data.choices[0].message.content || "";
    } catch (error: any) {
      console.log(error);
      response = "Error: " + error.message;
    }
    /* TODO: Move this to an edge function such that I can run this without manually fetching
    try {
      const result = await openAi.createCompletion({
        model: prompt.model ?? "gpt-3.5-turbo",
        prompt: prompt.prompt,
        temperature: prompt.temperature ?? 0.5,
        max_tokens: getMaxTokensForModel(prompt.model ?? "gpt-3.5-turbo"),
      });

      response = result.data.choices[0].text || "";
    } catch (error: any) {
      console.log(error);
      response = "Error: " + error.message;
    }
    */
    setLoadingResponse(false);
    return response;
  }

  const isReady = !isLoading && !loadingResponse;

  return { isReady, submitPrompt, loadingResponse }
}