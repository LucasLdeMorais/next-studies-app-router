"use client";

import type { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

interface PostItCreatorProps {
    handleCreatePostIt: (e: FormEvent) => void;
    handleWriteTitle: (e: ChangeEvent<HTMLInputElement>) => void;
    handleWriteText: (e: ChangeEvent<HTMLInputElement>) => void;
};

const StyledCreator = styled.div`
    width: 150px;
    height: 150px;
    margin: 5px;
    border: solid black 1px;
    background-color:  #e2b051;
    padding: 5px;

    input {
        width: 137px;
    };
`
  
export default function PostItCreator({handleCreatePostIt, handleWriteTitle, handleWriteText, ...props} :PostItCreatorProps) {
  
    return <>
      <StyledCreator id="creator" {...props}>
          <form onSubmit={(e) => {handleCreatePostIt(e)}}>
            <input type="text" id="creator-title-input" name="Title" placeholder="Title" onChange={(e) => handleWriteTitle(e)}/>
            <input type="text" id="creator-text-input" name="Text" placeholder="Text" onChange={(e) => handleWriteText(e)}/>
            <button type="submit">
                Add
            </button>
          </form>
      </StyledCreator>
    </>
};