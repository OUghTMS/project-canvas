import React from "react";

export default function FileLoadingButton(prop) {

    const addFile = (event) => {
        if (event.target.files !== ' ') {

            const file = event.target.files;
            const reader = new FileReader();
            
            if(file.length === 1) {
                
                reader.readAsText(file[0]);
                reader.onload = (event) => {
                    prop.checkData(event.target.result);
                }
            } 
        }
    }

    const reset = (event) => {

        event.target.form.reset();
    }

    return (
        <form>
            <label className="file-input">
                <input type="file" onChange={addFile} onClick={reset} accept=".txt"/>
                Upload File
            </label>
        </form>
    );
}