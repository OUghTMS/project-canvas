import React from "react";

export default function FileLoadingButton(prop) {

    const addFile = (event) => {
        const file = event.target.files;
        const reader = new FileReader();

        if(file.length === 1) {

            reader.readAsText(file[0]);
            reader.onload = (event) => {
                prop.checkData(event.target.result);
            } 
        } 
    }

    return (
        <label className="file-input">
            <input type="file" onChange={addFile} />
            Upload File
        </label>
    );
}