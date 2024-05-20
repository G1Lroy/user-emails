import { SetStateAction, memo, useRef, useState } from "react";
import "draft-js/dist/Draft.css";
import "./../assets/styles/EmailEditor.scss";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createToolbarPlugin, { Separator } from "@draft-js-plugins/static-toolbar";
import {
  DraftJsButtonTheme,
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";
import "./../assets/styles/EmailEditor.scss";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";

type ExternalProps = {
  theme: DraftJsButtonTheme;
  getEditorState: () => EditorState;
  setEditorState: (editorState: EditorState) => void;
  onOverrideContent: (content: React.ComponentType<any> | undefined) => void;
};
type EmailEditorProps = {
  onGetValues: (html: string) => void;
  disabledCondition: boolean;
};

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];

const EmailEditor = ({ onGetValues, disabledCondition }: EmailEditorProps) => {
  const editor = useRef(null);
  const [isEditorDisabled, setDisabled] = useState(true);
  const [editorState, setEditorState] = useState(createEditorStateWithText(""));

  const toggleEditor = () => setDisabled(!isEditorDisabled);
  const focus = () => (editor?.current as Editor | null)?.focus?.();

  const handleChange = (state: SetStateAction<EditorState>) => setEditorState(state);

  const convertToHTML = () => {
    const contentState = editorState.getCurrentContent();
    const html = JSON.stringify(stateToHTML(contentState));
    onGetValues(html);
  };

  return (
    <>
      <div className="editor-block">
        <div>Message:</div>
        <button
          onClick={() => {
            if (isEditorDisabled) {
              toggleEditor();
              focus();
            } else {
              toggleEditor();
              convertToHTML();
            }
          }}
          type="button"
        >
          {isEditorDisabled ? "Edit message" : "Finish editing"}
        </button>
        <div className="editor" onClick={focus}>
          {(isEditorDisabled || disabledCondition) && <div className="disable-mask" />}
          <Editor editorState={editorState} onChange={handleChange} plugins={plugins} ref={editor} />
          <Toolbar>{(externalProps: ExternalProps) => <MemoizedToolbar externalProps={externalProps} />}</Toolbar>
        </div>
      </div>
    </>
  );
};

export default memo(EmailEditor);

const MemoizedToolbar = memo(({ externalProps }: { externalProps: ExternalProps }) => (
  <div>
    <BoldButton {...externalProps} />
    <ItalicButton {...externalProps} />
    <UnderlineButton {...externalProps} />
    <CodeButton {...externalProps} />
    <Separator />
    <UnorderedListButton {...externalProps} />
    <OrderedListButton {...externalProps} />
    <BlockquoteButton {...externalProps} />
    <CodeBlockButton {...externalProps} />
  </div>
));
