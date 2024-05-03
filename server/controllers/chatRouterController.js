import chats from '../data/data.js'


export const handleChatData = (req, res) => {
    res.send(chats);
}

export const handleSingleChatData = (req, res) => {
    const chat = chats.find((chat) => chat._id === req?.params?.id);
  res.send(chat);
};