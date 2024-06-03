import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ childern }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const uesrInfo = localStorage.getItem("userInfo");
    setUser(uesrInfo);

    if (!uesrInfo) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {childern}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
