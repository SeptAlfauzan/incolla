import Papa from "papaparse";
import React from "react";

export const useCSV = () => {
  const [result, setResult] = React.useState<string[]>([]);

  const parseFile = (fileData: File): void => {
    let result;
    const options: Papa.ParseLocalConfig<string, File> = {
      // header: true,
      newline: "\r\n",
      delimiter: ",",
      skipEmptyLines: true,
      complete: (results) => setResult(results.data.toString().split(",")),
    };
    Papa.parse(fileData, options);
  };
  return [result, { setParseCSVFile: parseFile }] as const;
};

// class CSV {
//   static read = (fileData: File) => {
//     let result;
//     const options: Papa.ParseLocalConfig<unknown, File> = {
//       header: true,
//       delimiter: ",",
//       skipEmptyLines: true,
//       complete: (results) => (result = results),
//     };
//     Papa.parse(fileData, options);
// console.log(result);
// const reader = new FileReader();
// reader.onload = (event) => {
//   const list = event.target?.result?.toString().split(",");
//   list?.map((data) => result.push(data));
// };
// reader.readAsText(fileData);

// console.log(result);
//   };
// }

// export default CSV;
