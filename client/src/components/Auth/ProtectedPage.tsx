import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedPage = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchProtectedContent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/protected",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContent(response.data);
      } catch (err) {
        console.error("Failed to fetch protected content");
      }
    };
    fetchProtectedContent();
  }, []);

  return <div>{content}</div>;
};

export default ProtectedPage;
