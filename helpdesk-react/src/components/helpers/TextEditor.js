import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as api from '../../api/index';
import { URLS } from "../../constants/urls";

const TextEditor = ({ setEditorText }) => {

    const handleEditorState = (state) => {
        const blocks = convertToRaw(state.getCurrentContent());
        const data = draftToHtml(blocks);
        setEditorText(data);
    }


    const uploadCallback = (file) => {
        return new Promise((resolve, reject) => {
            // const formData = new FormData();
            // formData.append("draft_image", file);
            // const fonsk = async () => { return await api.draftImageUpload(formData); };
            postImage(file).then(data => resolve({ data: { link: `${URLS.axiosBaseURL}/draft_images/${data}` } }));
        });
    }

    const handlePastedText = (text, html) => {
        console.log(text, html);
    }

    const handlePastedFiles = (file, text, src) => {
        postImage(file[0]).then(data => console.log(data));
    }

    const postImage = async (file) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("draft_image", file);
            const fonsk = async () => { return await api.draftImageUpload(formData); };
            fonsk().then(data => resolve(data.data.data));
        });
        

    }

    return (
        <>
            <Editor
                onEditorStateChange={handleEditorState}
                editorClassName="editor-class"
                handlePastedText={handlePastedText}
                stripPastedStyles={false}
                handlePastedFiles={handlePastedFiles}
                toolbar={
                    {
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'history'],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough']
                        },
                        colorPicker: {
                            className: undefined,
                            component: undefined,
                            popupClassName: "popupClassName",
                            colors: ['#FFFFFF', '#C0C0C0', '#808080', '#000000',
                                '#FF0000', '#800000', '#FFFF00', '#808000', '#00FF00',
                                '#008000', '#00FFFF', '#008080', '#0000FF', '#000080',
                                '#FF00FF', '#800080'],
                        },
                        image: {
                            className: undefined,
                            component: undefined,
                            popupClassName: undefined,
                            urlEnabled: true,
                            uploadEnabled: true,
                            alignmentEnabled: true,
                            uploadCallback: uploadCallback,
                            previewImage: false,
                            inputAccept: 'image/jpeg,image/jpg,image/png',
                            alt: { present: false, mandatory: false },
                            defaultSize: {
                                height: 'auto',
                                width: 'auto',
                            },
                        },
                        remove: undefined,
                    }
                }
            />
        </>
    )
}

export default TextEditor
