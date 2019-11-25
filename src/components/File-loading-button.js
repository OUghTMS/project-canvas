import React from "react";

export default function FileLoadingButton(prop) {

    const addFile = (event) => {
        const file = event.target.files;
        const reader = new FileReader();

        reader.readAsText(file[0]);
        reader.onload = (event) => {
            prop.checkData(event.target.result);
        } 
    }

    return (
        <input type="file" onChange={addFile}/>
    );
}