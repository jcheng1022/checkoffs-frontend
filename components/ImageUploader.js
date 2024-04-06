'use client'

import styled from "styled-components";
import {Button} from "antd";
import {useRef, useState} from "react";
import {EmptyImage} from "@/components/EmptyImage";
import {Gap} from "@/components/core";

const ImageUploader = ({ register, onFileUpload }) => {
    const hiddenInputRef = useRef();


    const [preview, setPreview] = useState();
    const [uploadedFile, setUploadedFile] = useState(null);


    const handleUploadedFile = (event) => {
        const file = event.target.files[0];

        const urlImage = URL.createObjectURL(file);

        console.log(urlImage, 'urlImage')
        setPreview(urlImage);

        setUploadedFile(file)
        onFileUpload(file)


    };

    const inputReg = register("image", {
        onChange: e => handleUploadedFile(e)
    });





    const onUpload = () => {
        hiddenInputRef.current?.click();
    };


    const uploadButtonLabel =
        preview ? "Change image" : "Upload image";

    const {ref : registerRef, ...rest} = inputReg;

    return (
        <Container>



                <input
                    className={'hidden-input'}
                    type="file"
                    name="image"
                    accept="image/*"


                    // onChange={handleUploadedFile}
                    // {...rest}

                    {...rest}

                    ref={(e) => {
                        registerRef(e);
                        hiddenInputRef.current = e;
                    }}

                />


            { preview ?
                <div className={'image-container'}>
                    <img src={preview}  className={'image'} />
                </div>
                : <EmptyImage upload={onUpload}/>}

            <Gap gap={12}/>
            <Button variant="text" onClick={onUpload}>
                {uploadButtonLabel}
            </Button>

        </Container>
    );
};

export default ImageUploader;

const Container = styled.div`
  
  .hidden-input {
    display: none;
  }

  .image-container {
    width: 200px;
    height: 200px;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit:cover;
    border-radius: 12px;
  }
`
