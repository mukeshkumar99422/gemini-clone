/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {assets} from '../../assets/assets';
import './Sidebar.css';
import { useGeminiContext } from '../../context/GeminiContext';

function Sidebar() {
  const [extended,setExtended]=useState(false);
  const {onSent,prevPrompts,setPrevPrompts,setInput,setRecentPrompt,newChat} = useGeminiContext();

  //extract prompts from local storage(browser storage)
  useEffect(()=>{
    const promptsStored=JSON.parse(localStorage.getItem("prompts"));
    if(promptsStored && promptsStored.length>0){
      setPrevPrompts(promptsStored);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  //store in local storage
  useEffect(()=>{
    localStorage.setItem("prompts",JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  const loadPrompt=async (prompt)=>{
    await onSent(prompt);
  }

  return (
    <div className='sidebar'>
      <div className="top">
        <img src={assets.menu_icon} alt="MENU" className="menu" 
        onClick={(e)=>setExtended(!extended)}/>
        <div className="new-chat" onClick={newChat}>
          <img src={assets.plus_icon} alt="PLUS" />
          {extended?<p>New Chat</p>:null}
        </div>
        {extended?
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-list">
              {prevPrompts.map((item,index)=>{
                return(
                  <React.Fragment key={index}>
                    <div className="recent-entry" onClick={()=>loadPrompt(item)}>
                      <img src={assets.message_icon} alt="MSG" />
                      <p>{item.substring(0,12)}...</p>
                    </div>
                  </React.Fragment>
                )
              })
              }
            </div>
          </div>:null
        }
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="QUES" />
          {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="HIST" />
          {extended?<p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="SETT" />
          {extended?<p>Settings</p>:null}
        </div>
      </div>

    </div>
  )
}

export default Sidebar