"use client";

import React, { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, Key, MouseEvent } from "react";
import type { PostIt } from "./types";
import PostItComponent from "./components/PostItComponent";
import PostItCreator from "./components/PostItCreator";
import styled from "styled-components";
import { ChangedElement } from "./enums";

const PostItsWrapper = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
`;

export default function PostIts() {
	const [loading, setloading] = useState(true);
	const [postIts, setPostIts] = useState<PostIt[]>([]);
    const postItsPrevState = useRef<PostIt[]>([]);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	// const serverUrl = useRef("https://jsonplaceholder.typicode.com");
	
    // useEffect(() => {
	// 	fetch(serverUrl.current.concat("/posts"))
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			const auxArr: PostIt[] = [];
	// 			//   data.forEach((todo :unknown) => {
	// 			//     auxArr.unshift({
	// 			//       id: todo.id,
	// 			//       title: todo.title,
	// 			//       text: todo.body
	// 			//     })
	// 			//   });
	// 			for (const todo of data) {
	// 				auxArr.unshift({
	// 					id: todo.id,
	// 					title: todo.title,
	// 					text: todo.body,
	// 				});
	// 			}
	// 			setPostIts(auxArr);
	// 			setloading(false);
	// 		});
	// }, []);

	useEffect(() => {
        //get the string from storage
		const storageJsonString = sessionStorage.getItem("postIts") || "";
        
        //initialize the postIt array in the function scope
        let storagePostIts:PostIt[] = [];
        if(storageJsonString && storageJsonString !== ""){
            //if the string is not null or empty, parse the string to object
            storagePostIts = JSON.parse(storageJsonString, postItReviver);
        }
        // if the array is not empty
		if (storagePostIts.length > 0) {
			try {
                console.log(`Tem coisa!,${storagePostIts}, tamanho: ${storagePostIts.length}`)
				// set the state array with the array obtained from storage
                setPostIts(storagePostIts);
			} catch (error) {
				console.error("Erro ao fazer o parsing da string JSON:", error);
			}
		} else {
            console.log("Não tinha coisa")
        }
        setloading(false);
	}, []);

	useEffect(() => {
        // check if the postit array state actually changed
        if(postIts && postIts !== postItsPrevState.current) {
            console.log(`atualizou! de ${postItsPrevState.current} para ${postIts}`)
            //if so, updates the storage array 
		    sessionStorage.setItem("postIts", JSON.stringify(postIts));
            //updates the prevState ref
            postItsPrevState.current = postIts;
        } else {
            console.log("não atualizou")
        }
	}, [postIts]);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function postItReviver(key: any, value: any) {
		if (
			typeof value === "object" &&
			value !== null &&
			"title" in value &&
			"text" in value &&
			"id" in value
		) {
			const postit: PostIt = {
				title: value.title,
				text: value.text,
				id: value.id,
			};
			return postit;
		}
		return value;
	}

	function handleCreatePostIt(e: FormEvent): void {
		e.preventDefault();
		setPostIts((prevPostIts) => [
			{
				id: btoa(`${title}${text}${Date.now()}`),
				title: title,
				text: text,
			},
			...prevPostIts,
		]);

		const form = e.currentTarget as HTMLFormElement;

		if (form) {
			form.reset();
		}
		setTitle("");
		setText("");
	}

	function handleDeletePostit(e: MouseEvent, id: Key): void {
		e.preventDefault();
		setPostIts(
			postIts.filter((el) => {
				return el.id !== id;
			}),
		);
	}

	function handleWriteTitle(e: ChangeEvent<HTMLInputElement>): void {
		e.preventDefault();
		const input = e.currentTarget as HTMLInputElement;
		setTitle(input.value);
	}

	function handleWriteText(e: ChangeEvent<HTMLInputElement>): void {
		e.preventDefault();
		const input = e.currentTarget as HTMLInputElement;
		setText(input.value);
	}

    function handleUpdateContent(e: ChangeEvent<HTMLTextAreaElement>, id: Key, changedContent: ChangedElement): void {
        const index = postIts.findIndex(el => el.id === id);
        if(index) {
            if (changedContent === ChangedElement.title)
                postIts[index].title = e.currentTarget.value
            if (changedContent === ChangedElement.text)
                postIts[index].text = e.currentTarget.value

            sessionStorage.setItem("postIts", JSON.stringify(postIts));
        }
    }

	return (
		<main>
			<h1>PostIts</h1>
			<PostItsWrapper id="postits-wrapper">
                {!loading ? <></> : <h3>Loading...</h3>}
				<PostItCreator
					handleWriteTitle={handleWriteTitle}
					handleWriteText={handleWriteText}
					handleCreatePostIt={handleCreatePostIt}
					key={"creator"}
				/>
				{postIts.length > 0 ? (
					postIts.map((postIt) => {
						return (
							<PostItComponent
								id={postIt.id}
								title={postIt.title}
								text={postIt.text}
								handleDeletePostit={handleDeletePostit}
                                handleUpdateContent={handleUpdateContent}
								key={postIt.id}
							/>
						);
					})
				) : (
					<></>
				)}
			</PostItsWrapper>
		</main>
	);
}
