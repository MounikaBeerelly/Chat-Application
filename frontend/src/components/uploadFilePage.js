// import React, { Component } from 'react';
// import axios from 'axios';

// class UploadFileComponent extends Component {
//     state = {
//         selectedFile: null,
//     }
//     fileSelectedHandler = event => {
//         this.setState = ({
//             selectedFile: event.target.files[0]
//         });
//     }

//     fileUploadHandler = event => {
//         const fd = new FormData();
//         // fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
//         axios.post('url', fd, {
//             onUploadProgress: ProgressEvent => {
//                 console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%');
//             }
//         })
//             .then(res => {
//                 console.log(res);
//             });
//     }

//     render() {
//         return (
//             <div>
//                 <input
//                     style={{ display: 'none' }}
//                     type="file"
//                     onChange={this.fileSelectedHandler}
//                     ref={fileInput => this.fileInput = fileInput} />
//                 <button onClick={() => this.fileInput.click()}>Pick File</button>
//                 <button onClick={this.fileUploadHandler}>Upload</button>
//             </div>
//         );
//     }
// }

// export default UploadFileComponent;


import React, { Component } from 'react';
import AxiosInstance from '../axiosService';
import { ProgressBar } from 'react-bootstrap';

class UploadFileComponent extends Component {

    state = {
        // Initially, no file is selected 
        selectedFiles: null,
        uploadPercentage: 0,
    };

    // On file select (from the pop up) 
    onFileChange = event => {
        // Update the state 
        this.setState({ selectedFiles: event.target.files });
    };

    // On file upload (click the upload button) 
    onFileUpload = (event) => {
        console.log(event)
        // Create an object of formData 
        const formData = new FormData();
        // Update the formData object 
        const files = this.state.selectedFiles;

        const options = {
            onUploadProgress: (ProgressEvent) => {
                const { loaded, total } = ProgressEvent;
                let percent = Math.floor(loaded * 100 / total);
                console.log(`${loaded}b of ${total}b | ${percent}%`)

                if (percent < 100) {
                    this.setState({ uploadPercentage: percent });
                }
            }
        }
        for (let i = 0; i < files.length; i++) {
            formData.append(`chatApp`, files[i])
        }
        // Details of the uploaded file         
        // Request made to the backend api 
        // Send formData object 
        AxiosInstance().post("/upload", formData, options).then(res => {
            console.log(res);
            setTimeout(() => {
                this.setState({ uploadPercentage: 0 })
            }, 1000);
        });
    };

    // File content to be displayed after 
    // file upload is complete 
    fileData = () => {
        if (this.state.selectedFile) {

            return (
                <div>
                    <h2 style={{ "color": "red", textAlign: "left" }}>File Details:</h2>
                    <p><strong>File Name: </strong> {this.state.selectedFile.name}</p>
                    <p><strong>File Type: </strong>{this.state.selectedFile.type}</p>
                    <p>
                        <strong>Last Modified: </strong>{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        const { uploadPercentage } = this.state;
        return (
            <div>
                <h3 style={{ color: "green", textAlign: "center" }}>File Upload using React!</h3>
                <div>
                    <input type="file" multiple onChange={this.onFileChange} />
                    {uploadPercentage > 0 && <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`} />}
                    <button onClick={this.onFileUpload}>
                        Upload!
                </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default UploadFileComponent; 
