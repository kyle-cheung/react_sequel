import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const UserInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const maxRows = 5;

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = parseInt(window.getComputedStyle(textareaRef.current).lineHeight) * maxRows;
      textareaRef.current.style.height = scrollHeight > maxHeight ? `${maxHeight}px` : `${scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [input]);

  const handleAction = (e) => {
    const isCtrlEnter = e.key === 'Enter' && e.ctrlKey;
    const isFormSubmit = e.type === 'submit';

    if (isCtrlEnter || isFormSubmit) {
      e.preventDefault();
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleAction} className="flex items-center mt-4 mx-40">
      <input
        ref={textareaRef}
        value={input}
        placeholder="Ask your data..."
        onChange={(e) => setInput(e.target.value)}
        onInput={resizeTextarea}
        onKeyDown={handleAction}
        className="resize-none overflow-y-auto p-3 w-full border border-gray-300 rounded-lg"
      />
      <button type="submit" className="ml-4 text-gray-400 hover:text-gray-900 transition-colors rounded-full">
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="text-xl"
        />
      </button>
    </form>
  );
};

export default UserInput;
