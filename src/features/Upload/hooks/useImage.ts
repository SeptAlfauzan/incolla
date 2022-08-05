import React from "react";

export const useImage = () => {
  const [result, setResult] = React.useState<string>("");

  const parseImageFile = (file: File) => setResult(URL.createObjectURL(file));
  return [result, { setParseImageFile: parseImageFile }] as const;
};
