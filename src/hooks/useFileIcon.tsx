import doc from "../assets/file-icons/doc.png";
import pdf from "../assets/file-icons/pdf.png";
import jpg from "../assets/file-icons/jpg.png";
import png from "../assets/file-icons/png.png";
import file from "../assets/file-icons/file.png";

const useFileIcon = () => {
  const fileIcon = (fileType: string) => {
    if (fileType?.includes("jpg")) {
      return jpg;
    } else if (fileType?.includes("pdf")) {
      return pdf;
    } else if (fileType?.includes("doc")) {
      return doc;
    } else if (fileType?.includes("docx")) {
      return doc;
    } else if (fileType?.includes("png")) {
      return png;
    } else return file;
  };

  return { fileIcon };
};

export default useFileIcon;
