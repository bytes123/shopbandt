import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";

function Add({ description, onDescription }) {
  const onChangeValue = (e) => {
    onDescription(e.target.value);
  };
  const ondescription = (value) => {
    onDescription(value);
  };
  const [isError, setError] = useState(null);
  useEffect(() => {
    console.log(description);
  }, [description]);
  return (
    <form className="update_forms">
      <div className="form-row">
        <div className="form-group col-md-12 editor">
          <EditorToolbar toolbarId={"t1"} />
          <ReactQuill
            theme="snow"
            value={description}
            onChange={ondescription}
            placeholder={"Write something awesome..."}
            modules={modules("t1")}
            formats={formats}
          />
        </div>
        <br />
        <br />
        {isError !== null && <div className="errors"> {isError} </div>}
      </div>
    </form>
  );
}
export default Add;
