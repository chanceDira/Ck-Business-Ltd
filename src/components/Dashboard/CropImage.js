import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { storage } from "../../config/db";

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}
const Container = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
border-width: 2px;
border-radius: 2px;
border-color: ${props => getColor(props)};
border-style: dashed;
background-color: #fafafa;
color: #bdbdbd;
outline: none;
transition: border .24s ease-in-out;
height: 50vh;
`;



export default class CropImage extends Component {
    constructor(props) {
        super(props);
        this.onDrop = (files) => {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ files, src: reader.result })
            );
            reader.readAsDataURL(files[0]);
        };
        this.state = {
            files: [],
            show: false,
            src: null,
            croppedUrl: "",
            loading: false,
            croppedImageUrl: '',
            crop: {
                unit: '%',
                width: 80,
                heigth: 80,
                x: 25,
                y: 25,
                aspect: 16 / 16,
            },
        }
    }

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    };


    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        const croppedUrl = new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
        this.setState({ croppedUrl })
        return croppedUrl;
    }

    async handleSubmit() {
        let data;
        let xhr = new XMLHttpRequest();
        let imgURL = this.state.croppedImageUrl;
        xhr.open("GET", imgURL);
        xhr.responseType = "blob";
        xhr.onload = () => {
            data = xhr.response;
            uploadImage(data);
        }
        xhr.send();
        const uploadImage = async (blobImage) => {
            let imgData = new FormData();
            imgData.append("profile", blobImage);
            storage.put(imgData).then(function(snapshot) {
                console.log(snapshot);
                console.log('Uploaded a blob or file!');
              });
        }

    }


    render() {
        const { crop, src } = this.state;
        return (
            <>
                        {!src &&
                            <Dropzone onDrop={this.onDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <section className="container">
                                        <Container {...getRootProps({ className: "dropzone" })}>
                                            <input {...getInputProps()} />
                                            <p>Drag & drop your image here, or click to upload</p>
                                        </Container>
                                    </section>
                                )}
                            </Dropzone>
                        }
                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                        )
                          }

                          <div>
                          <button
                          type="button" 
                        onClick={this.handleSubmit}
                          class="btn btn-info w-25 mt-3">SAVE</button>
                          </div>
            </>
        );
    }
}
