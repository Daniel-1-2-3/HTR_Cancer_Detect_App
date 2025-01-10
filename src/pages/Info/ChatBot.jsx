import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Input,
    Button,
} from "@nextui-org/react";

const AIChat = ({ closeChat }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const openAiApiKey = "";
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessages = [
            ...messages,
            { role: "user", content: userInput },
        ];

        setMessages(newMessages);
        setUserInput("");

        try {
            setIsLoading(true);

            const response = await axios.post(
                apiEndpoint,
                {
                    model: "gpt-3.5-turbo",
                    messages: newMessages.map((msg) => ({
                        role: msg.role,
                        content: "you are to assume the role of a helpful chatbot on SkinScope, a web app with a tensorflow trained model built to detect different variations of skin cancer, moles, and other skin diseases, and if the question is irrelevant, answer with a kind way of saying cannot help: " + msg.content,
                    })),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${openAiApiKey}`,
                    },
                }
            );

            const assistantMessage = response.data.choices[0].message.content;
            setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);
        } catch (error) {
            console.error("Error communicating with OpenAI API:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="max-w-[400px] fixed bottom-5 right-5 shadow-lg bg-white rounded-md bg-opacity-90">
            <CardHeader className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                    <Image
                        alt="AI Chatbot"
                        height={40}
                        radius="sm"
                        src="https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png"
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">AI Chatbot</p>
                        <p className="text-small text-default-500">Ask me anything</p>
                    </div>
                </div>
                {/* Close button */}
                <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={closeChat}
                >
                    ✖
                </button>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col h-80 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded-lg ${
                            msg.role === "user"
                                ? "self-end bg-gradient-to-tr from-pink-500 to-yellow-500 text-white"
                                : "self-start bg-gray-200 text-black"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                {isLoading && (
                    <div className="self-start text-gray-500">AI is typing...</div>
                )}
            </CardBody>
            <CardFooter className="flex gap-2">
                <Input
                    className="flex-1 rounded border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gradient-to-tr from-pink-500 to-yellow-500"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                    }}
                    placeholder="Type your message..."
                />
                <Button
                    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                    radius="full"
                    disabled={isLoading}
                    onClick={sendMessage}
                >
                    Send
                </Button>
            </CardFooter>
        </Card>
    );
};
AIChat.propTypes = {
    closeChat: PropTypes.bool.isRequired,
}

export default AIChat;
