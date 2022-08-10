export const getLongestNameWidth = (nameList: string[]) => {
  const longestName = nameList.reduce((prev: string, current: string) =>
    current.length > prev.length ? current : prev
  );
  return longestName;
};
