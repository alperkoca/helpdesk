import React, {useState} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({setEditorText}) => {

    const handleEditorState = (state) => {
        const blocks = convertToRaw(state.getCurrentContent());
        const data = draftToHtml(blocks);
        setEditorText(data);
    }


    const uploadCallback = (file) => {
        return new Promise((resolve, reject ) =>{
            resolve({data: {link: "https://picsum.photos/160/160"}})
        });
    }

    const handlePastedText = (text, html) => {
        console.log(text, html);
    }

    const handlePastedFiles = (file, text, src) => {
        console.log(file, text, src);
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
