import { message, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useRef, useState } from "react";
import { AiOutlineRedo } from "react-icons/ai";
import { FaRegImage } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineTouchApp } from "react-icons/md";
import ReactSignatureCanvas from "react-signature-canvas";
import { twJoin } from "tailwind-merge";
import { EmptyInputIndicator } from "./EmptyInputIndicator";
import { SignMode } from "./SignMode";
import { SignModeButton } from "./SignModeButton";

/** 500KB max file upload size */
const MAX_FILE_SIZE = 1024 * 500;

type Props = {
  /** A signature that the user has previously uploaded. */
  oldSignature?: string;

  /**
   * If true, the component will behave like `<input required />` and trigger the
   * native browser validation to prevent a parent form from submitting when it is empty.
   */
  required?: boolean;

  /**
   * This is called by the component to pass the current value to its parent.
   * Note that `onChange(undefined)` is called when the input is cleared, but
   * `onChange(undefined)` is also called if the user chooses to use the old
   * signature. A defined value is only passed when the user inputs a new
   * signature, either by drawing or importing one.
   */
  onChange?: (value: string | undefined) => void;
};

export default function SignatureInput({
  oldSignature,
  required,
  onChange,
}: Props) {
  const signCanvasRef = useRef<ReactSignatureCanvas | null>(null);
  const hasExisting = !!oldSignature && /^data:image\//.test(oldSignature);
  const [mode, setMode] = useState(
    hasExisting ? SignMode.EXISTING : SignMode.DRAWING
  );
  const [upload, setUpload] = useState<string | undefined>(undefined);
  const [isEmpty, setIsEmpty] = useState(!hasExisting);

  const onBeginDraw = () => {
    setIsEmpty(false);
  };

  const onEndDraw = () => {
    const canvas = signCanvasRef.current;
    if (!canvas) return;

    const image = canvas.getTrimmedCanvas().toDataURL("image/png");
    onChange?.(image);
    setIsEmpty(!image);
  };

  const onClear = () => {
    signCanvasRef?.current?.clear();
    setUpload(undefined);
    onChange?.(undefined);
    setIsEmpty(true);
  };

  const chooseDrawing = () => {
    onClear();
    setMode(SignMode.DRAWING);
  };

  const chooseUpload = () => {
    onClear();
    setMode(SignMode.UPLOAD);
  };

  const chooseExisting = () => {
    setMode(SignMode.EXISTING);
    onChange?.(oldSignature);
    setIsEmpty(false);
  };

  const onAntdUpload = (file: RcFile) => {
    if (file.size > MAX_FILE_SIZE) {
      message.error("File is too large (>500kb)");
    }
    // setUpload from data URI of file
    const reader = new FileReader();
    reader.onload = () => {
      const dataUri = reader.result as string;
      setUpload(dataUri);
      onChange?.(dataUri);
      setIsEmpty(false);
    };
    reader.readAsDataURL(file);
    return false;
  };

  useEffect(() => {
    const canvas = signCanvasRef.current?.getCanvas();
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const timeout = setTimeout(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const padContentStyle = "top-0 left-0 w-full h-full absolute object-contain";

  return (
    <div className="border border-gray-300 bg-white overflow-hidden min-w-[360px]">
      <div className="flex border-b justify-stretch">
        <SignModeButton
          text="Use Existing"
          icon={<AiOutlineRedo size={25} />}
          onlyIf={hasExisting}
          onClick={chooseExisting}
          tooltip="Use the signature you previously uploaded"
          highlighted={mode === SignMode.EXISTING}
        />

        <SignModeButton
          text="Cursor/Touch"
          icon={<MdOutlineTouchApp size={25} />}
          onClick={chooseDrawing}
          tooltip="Draw your signature using your cursor or touch screen"
          highlighted={mode === SignMode.DRAWING}
        />

        <SignModeButton
          text="Import File"
          icon={<FaRegImage size={25} />}
          onClick={chooseUpload}
          tooltip="Import your signature from an image file"
          highlighted={mode === SignMode.UPLOAD && !upload}
        />

        <SignModeButton
          onlyIf={false}
          text="From Phone"
          // icon={phoneIcon}
          tooltip="Input your signature using another device such as a phone"
          highlighted={mode === SignMode.PHONE}
        />
      </div>

      <div className="w-full pt-[50%] relative overflow-hidden border-y">
        {mode === SignMode.DRAWING && isEmpty && (
          <div
            className={twJoin(
              padContentStyle,
              "flex items-center justify-center text-center text-sm text-gray-400 p-12"
            )}
          >
            Draw your signature here using your cursor or touch screen
          </div>
        )}

        {mode === SignMode.DRAWING && (
          <ReactSignatureCanvas
            ref={signCanvasRef}
            penColor="blue"
            dotSize={4}
            onEnd={onEndDraw}
            onBegin={onBeginDraw}
            clearOnResize={false}
            canvasProps={{ className: padContentStyle }}
          />
        )}

        {mode === SignMode.UPLOAD && !upload && (
          <div className={twJoin(padContentStyle, "p-4")}>
            <Upload.Dragger beforeUpload={onAntdUpload} accept="image/*">
              <div className="flex flex-col items-center justify-center gap-2">
                <IoCloudUploadOutline size={30} />
                <div className="text-sm font-medium">
                  Click here or drag a file here to import your signature
                </div>
              </div>
            </Upload.Dragger>
          </div>
        )}

        {mode === SignMode.UPLOAD && upload && (
          <img
            src={upload}
            alt="Uploaded signature"
            className={padContentStyle}
          />
        )}

        {mode === SignMode.EXISTING && (
          <img
            src={oldSignature}
            alt="Existing signature"
            className={padContentStyle}
          />
        )}

        {<EmptyInputIndicator required={required || false} empty={isEmpty} />}
      </div>

      {mode === SignMode.DRAWING && (
        <button
          type="button"
          className="flex items-center justify-center w-full h-8 gap-2 text-sm hover:text-red-500"
          onClick={onClear}
        >
          Erase Signature
        </button>
      )}
    </div>
  );
}
