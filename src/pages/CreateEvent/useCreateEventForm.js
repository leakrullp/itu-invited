import { useState } from "react";

export function useCreateEventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [signupLink, setSignupLink] = useState("");
  const [thumbnailPicture, setThumbnailPicture] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [keyWords, setKeyWords] = useState([]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSignupLink("");
    setThumbnailPicture(null);
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setKeyWords([]);
  };

  return {
    // values
    title,
    description,
    signupLink,
    thumbnailPicture,
    startDate,
    endDate,
    startTime,
    endTime,
    keyWords,

    // setters
    setTitle,
    setDescription,
    setSignupLink,
    setThumbnailPicture,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setKeyWords,

    resetForm,
  };
}
