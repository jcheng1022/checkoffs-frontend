'use client'

import styled from "styled-components";
import {Button} from "antd";
import {useRef, useState} from "react";
import {EmptyImage} from "@/components/EmptyImage";
import {Gap} from "@/components/core";
import {getOrientation} from 'get-orientation/browser'
import {getRotatedImage} from "@/utils/canvasUtils";


function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}

const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
}


const ImageUploader = ({ image, setImage,  register, onFileUpload }) => {
    const hiddenInputRef = useRef();


    const [preview, setPreview] = useState();
    // const [imageSrc, setImageSrc] = useState(null);
    // const [uploadedFile, setUploadedFile] = useState(null);


    const handleUploadedFile = async (e) => {

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)

            try {
                // apply rotation if needed
                const orientation = await getOrientation(file)
                const rotation = ORIENTATION_TO_ANGLE[orientation]
                if (rotation) {
                    imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
                }
            } catch (e) {
                console.warn('failed to detect the orientation')
            }

            setImage(imageDataUrl)
        }

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


            { image ?
                <div className={'image-container'}>
                    <img src={image}  className={'image'} />
                </div>
                : <EmptyImage upload={onUpload}/>}

            <Gap gap={12}/>
            { image && (
                <Button className={'change-image-btn'} onClick={onUpload}>
                    Change Image
                </Button>
            )}

        </Container>
    );
};

export default ImageUploader;

const Container = styled.div`
  
  .hidden-input {
    display: none;
  }
  .change-image-btn {
    width: 200px;
    height: 50px;
    border-radius: 12px;
    background-color: #1890ff;
    color: white;
    font-weight: 600;
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
