import { EditorState, convertToRaw } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

interface Props {
  mentions?: Array<{ text: string; value: string }>;
  text: string;
  setText: (arg: string) => void;
}

export default function Index(props: Props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
    const currentContent = editorState.getCurrentContent();
    const rawContentState = convertToRaw(currentContent);
    const html = draftToHtml(rawContentState);
    props.setText(html);
  };

  return (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: props.mentions,
        }}
      />
      {/* Render HTML content */}
      {/* <div>{props.text}</div> */}
    </>
  );
}
