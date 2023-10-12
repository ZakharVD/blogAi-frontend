import { ChangeEvent, FormEvent, useState } from "react";
import { usePromptPopup } from "../hooks/usePromptPopup";
import usePostInfo from "../hooks/usePostInfo";
import { useAlert } from "../hooks/useAlert";
import { useLoading } from "../hooks/useLoading";
import { httpAskChatGPt } from "../api/openai.api";

export default function PromptPopup() {
  const { isPromptOpen, setIsPromptOpen } = usePromptPopup();
  const [topicInput, setTopicInput] = useState("");
  const [wordsAmountInput, setWordsAmountInput] = useState("100");
  const { setContent } = usePostInfo();
  const { activateAlert } = useAlert();
  const { setLoading } = useLoading();

  function onClose() {
    return setIsPromptOpen(false);
  }
  function onTopicInputChange(event: ChangeEvent<HTMLInputElement>) {
    return setTopicInput(event.target.value);
  }
  function onWordAmountInputChange(event: ChangeEvent<HTMLInputElement>) {
    return setWordsAmountInput(event.target.value);
  }
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!topicInput || !wordsAmountInput) {
      activateAlert("Please fill the fields", "red");
      return;
    }
    if (Number(wordsAmountInput) < 100 || Number(wordsAmountInput) > 1000) {
      activateAlert("Please enter a valid amount", "yellow");
      return;
    }
    // make api call
    try {
      setIsPromptOpen(false);
      setLoading(true);
      const data = await httpAskChatGPt(topicInput, wordsAmountInput);
      setContent(data.choices[0].text);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <>
      {isPromptOpen && (
        <div className="flex justify-center items-center backdrop-blur-sm w-full h-full z-10 top-0 fixed">
          
          <form
            onSubmit={onSubmit}
            className="w-[95%] mx-auto max-w-[400px] bg-secondary rounded-xl shadow-md p-4 flex flex-col relative"
          >
            <p className="text-3xl mt-2 mb-5 font-bold text-center">Generate with AI</p>
            <div
              onClick={onClose}
              className="top-2 right-3 font-bold text-lg absolute cursor-pointer"
            >
              &#10005;
            </div>
            <input
              type="text"
              required
              placeholder="Enter the topic of the article"
              className="border-2 border-gray rounded-xl p-2 bg-third focus:border-red focus:border-opacity-40 focus:outline-none mb-2"
              onChange={onTopicInputChange}
            />
            <input
            required
              type="text"
              placeholder="Enter the amount of words"
              className="border-2 border-gray rounded-xl p-2 bg-third focus:border-red focus:border-opacity-40 focus:outline-none mb-1"
              onChange={onWordAmountInputChange}
            />
            <p className="font-light text-lightgray text-sm mb-6">
              * Must be between 100 - 1000 characters
            </p>
            <button className="bg-red rounded-xl border-2 border-transparent hover:bg-transparent hover:text-red hover:border-red p-3 text-white font-bold" type="submit">
              GENERATE
            </button>
          </form>
        </div>
      )}
    </>
  );
}
