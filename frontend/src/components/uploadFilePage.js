import React, { Component } from 'react';
import axios from 'axios';

class UploadFileComponent extends Component {
    state = {
        selectedFile: null,
    }
    fileSelectedHandler = event => {
        this.setState = ({
            selectedFile: event.target.files[0]
        });
    }

    fileUploadHandler = event => {
        const fd = new FormData();
        // fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('url', fd, {
            onUploadProgress: ProgressEvent => {
                console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%');
            }
        })
            .then(res => {
                console.log(res);
            });
    }

    render() {
        return (
            <div>
                <input
                    style={{ display: 'none' }}
                    type="file"
                    onChange={this.fileSelectedHandler}
                    ref={fileInput => this.fileInput = fileInput} />
                <button onClick={() => this.fileInput.click()}>Pick File</button>
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
        );
    }
}

export default UploadFileComponent;