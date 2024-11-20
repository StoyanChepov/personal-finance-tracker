import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useCreateAttachment } from "./useAttachments";
import { useParams } from "react-router-dom";
import { storage } from "../firebase/config";
const useStorage = (image, setAttachments) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url] = useState(null);
  const { expenseId } = useParams();
  const createAttachment = useCreateAttachment();

  useEffect(() => {
    // references
    let storageSpace;
    try {
      storageSpace = storage;
    } catch (error) {
      console.log("Error", error);
    }
    const imageRef = ref(storageSpace, image.file.name); // `/images/${image.name}`
    const uploadImage = uploadBytesResumable(imageRef, image.file);

    uploadImage.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await getDownloadURL(uploadImage.snapshot.ref);

        try {
          const newAttachment = await createAttachment(expenseId, {
            url,
            name: image.file.name,
          });
          setAttachments((prev) => [...prev, newAttachment]);
        } catch (error) {
          console.log("Error", error);
        }
      }
    );
  }, [image]);

  return { progress, url, error };
};

export default useStorage;
