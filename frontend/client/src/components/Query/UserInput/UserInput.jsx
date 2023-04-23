import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const UserInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const textAreaRef = useRef(null);
  const maxRows = 5;

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      const scrollHeight = textAreaRef.current.scrollHeight;
      const maxHeight = parseInt(window.getComputedStyle(textAreaRef.current).lineHeight) * maxRows;
      textAreaRef.current.style.height = scrollHeight > maxHeight ? `${maxHeight}px` : `${scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextArea();
  }, [input]);

  const handleAction = async (e) => {
    const isCtrlEnter = e.key === 'Enter' && e.ctrlKey;
    const isFormSubmit = e.type === 'submit';

    if (isCtrlEnter || isFormSubmit) {
      e.preventDefault();
      onSubmit(input);
      setInput('');
      textAreaRef.current.focus();

      try {
        const response = await axios.post('/server/test', { userInput: input });
        console.log(response.data)
      } catch (error) {
        console.error('Error making API call: ', error);
      }

    }
  };

  return (
    <form onSubmit={handleAction} >
      <div className="relative w-full mt-4">
        <input
          ref={textAreaRef}
          value={input}
          placeholder="Ask your data..."
          onChange={(e) => setInput(e.target.value)}
          onInput={resizeTextArea}
          onKeyDown={handleAction}
          className="resize-none overflow-y-auto p-3 pr-12 w-full border border-gray-300 rounded-lg bg-gray-100 font-manrope"
        />
        <button type="submit" className="absolute top-0 right-0 mr-4 mt-3 text-gray-400 hover:text-gray-900 transition-colors">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="text-xl"
          />
        </button>
      </div>
    </form>
  );
};

export default UserInput;
