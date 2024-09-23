import React, { useContext, useState } from 'react';
import './Sidebar.css'; // Ensure CSS file exists and is correctly applied
import { assets } from '../../assets/assets'; // Ensure path is correct
import Context from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {onSent,prevPrompts,setRecentPrompt,newChat}=useContext(Context)
  const loadPrompt=async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  const handleToggle = () => {
    console.log('Toggle clicked');
    setExtended(prev => !prev);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img className="menu"  onClick={handleToggle} src={assets.menu_icon} alt="Menu icon" />
        <div onClick={()=>newChat()}className="new-chat">
          <img  src={assets.plus_icon} alt="Toggle new chat" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item,index)=>{
              return (
                <div onClick={()=>loadPrompt(item)}className="recent-entry">
                <img src={assets.message_icon} alt="Message icon" />
                <p>{item.slice(0,18)}...</p>
              </div>
              )
            })}
          
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity icon" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
