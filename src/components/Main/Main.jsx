/* eslint-disable no-unused-vars */
import React from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { useGeminiContext } from '../../context/GeminiContext';

export default function Main(){
  const {onSent,input,setInput,recentPrompt,showResult,loading,resultData}=useGeminiContext();
  
  //function when prompt sent
  function submitHandle(){
    onSent(input);
  }

  //onclick card
  function onclickCard(e){
    if(e.target.tagName === "P" ||e.target.className === "card"){
      const prompt = e.target.innerText;
      onSent(prompt);
    }
  }

  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Gemini</p>
          <img src={assets.user_icon} alt="USER-IMG" />
        </div>


        <div className="main-container">
          
          {showResult?
          <div className='result'>
            <div className="user-que">
              <img src={assets.user_icon} alt="USER" />
              <p>{recentPrompt}</p>
            </div>
            <div className="gemini-ans">
              <img src={assets.gemini_icon} alt="GEMINI" />
              {loading?
              <div className='loader'>
                <hr />
                <hr />
                <hr />
              </div>:
              <p dangerouslySetInnerHTML={{__html:resultData}}></p> //treat result data as html element (not string) 
              }
            </div>
          </div>:
          <>
            <div className="greet">
              <p><span>Hello, Mukesh</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards" onClick={(e)=>onclickCard(e)}>
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="COMP" />
              </div>
              <div className="card">
                <p>Briefly summarize this cocept: urban planning</p>
                <img src={assets.bulb_icon} alt="COMP" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="COMP" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="COMP" />
              </div>
            </div>
          </>}

          <div className="main-bottom">
            <form onSubmit={(e) => { e.preventDefault(); submitHandle(); }}>
              <div className="search-box">
                <input type="text" placeholder='Enter a prompt here' 
                onChange={(e)=>setInput(e.target.value)} 
                value={input}/>
                <div>
                  <img src={assets.gallery_icon} alt="GAL" />
                  <img src={assets.mic_icon} alt="MIC" />
                  {input?
                    <>
                      <button type="submit" style={{ background: 'none', border: 'none', padding: 0 }}>
                        <img src={assets.send_icon} alt="SEND" />
                      </button>
                    </>:
                    null
                  }
                </div>
              </div>
            </form>

            <p className="bottom-info">
                Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </>
  )
}