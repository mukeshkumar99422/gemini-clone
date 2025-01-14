/* eslint-disable react-refresh/only-export-components */
import { createContext,useContext, useState } from "react";
import RunChat from "../config/RunChat";

import PropTypes from 'prop-types';
GeminiContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

//create context
export const GeminiContext=createContext();

// create context provider 
function GeminiContextProvider(props){
    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [prevPrompts,setPrevPrompts]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState("");

    //new chat function
    const newChat=()=>{
        setLoading(false);
        setShowResult(false);
    }

    //onSent prompt function
    async function onSent(prompt){
        setRecentPrompt(prompt);
        setPrevPrompts((prev)=>[...prev,prompt]);
        setResultData(""); //clear previous result
        setLoading(true);
        setShowResult(true); //loading animation till promise execute
        setInput("");
        
        const response = await RunChat(prompt);

        //modify resoponse
        let responseArrayForBold=response.split("**");
        let newResponse="";
        for (let i=0;i<responseArrayForBold.length;i++){
            if(i==0 || i%2==0){
                newResponse+=responseArrayForBold[i];
            }
            else{
                newResponse+="<b>"+responseArrayForBold[i]+"</b>";
            }
        }
        const newResponse2 = newResponse.split("*").join("</br>");

        //typing effect
        const delayPara=(index,nextWord)=>{
            setTimeout(function(){
                setResultData((prev)=>prev+nextWord);
            },20*index)
        }
        let responseArray=newResponse2.split(" ");

        setLoading(false);
        for (let i=0;i<responseArray.length;i++){
            const nextWord=responseArray[i];
            delayPara(i,nextWord+" ");
        }
    }

    const contextValue={
        onSent,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        loading,
        resultData,
        newChat,
    }

    return (
        <GeminiContext.Provider value={contextValue}>
            {props.children}
        </GeminiContext.Provider>
    )
}

//export provider and context
export default GeminiContextProvider;
export const useGeminiContext=()=>{
    return useContext(GeminiContext);
}

