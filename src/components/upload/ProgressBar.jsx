import { useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import { motion } from "framer-motion";

export default function ProgressBar({ image, setFile, setAttachments }) {
  const { progress, url } = useStorage(image, setAttachments);
  console.log(progress, url);
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
}
