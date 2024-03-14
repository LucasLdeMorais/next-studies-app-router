"use client";

import { useState, useRef } from "react";
import type { Key, ChangeEvent, MouseEvent } from 'react';
import type { PostIt } from "../types";
import { ChangedElement } from "../enums";
import styled from "styled-components";
  
interface PostItProps extends PostIt {
    handleDeletePostit: (e :MouseEvent, id: Key) => void;
    handleUpdateContent: (e :ChangeEvent<HTMLTextAreaElement>, id: Key, changedContent: ChangedElement) => void;
}

const StyledTextArea = styled.textarea`
    position: relative;
    display: block;
    width: 100%;
    resize: none;
    background-color:  #e2b051;
    border: none
`

const StyledPostIt = styled.div`
    width: 150px;
    height: 150px;
    margin: 5px;
    border: solid black 1px;
    background-color:  #e2b051;
    padding: 5px;

    &.postit-title {
        font-weight: bold;
    };
`

export default function PostItComponent({id, title, text, handleDeletePostit, handleUpdateContent, ...props} :PostItProps) {
    const [titleState, setTitle] = useState(title);
    const [textState, setText] = useState(text);
    const idRef = useRef<Key>(id);

    function handleChangeTitle(e :ChangeEvent<HTMLTextAreaElement>) :void{
        e.preventDefault();
        e.persist();
        setTitle(e.currentTarget.value);
        handleUpdateContent(e, idRef.current, ChangedElement.title);
    }

    function handleChangeText(e :ChangeEvent<HTMLTextAreaElement>) :void{
        e.preventDefault();
        e.persist();
        setText(e.currentTarget.value);
        handleUpdateContent(e, idRef.current, ChangedElement.text);
    }

    return <>
        <StyledPostIt {...props}>
            <StyledTextArea className="postit-title" onChange={(e) => handleChangeTitle(e)} value={titleState} wrap="hard" />
            <StyledTextArea className="postit-text" onChange={(e) => handleChangeText(e)} value={textState} wrap="hard" />
            <button type="button" onClick={(e) => handleDeletePostit(e,idRef.current)}>Delete</button>
        </StyledPostIt>
    </>
};