import "emoji-mart/css/emoji-mart.css";
import React, { useState, useCallback, useRef } from "react";
import {
    Button
  } from '@chakra-ui/react';
import { Picker, EmojiData } from "emoji-mart";
import FunnyEmojiIcon from "./FunnyEmojiIcon";
import useClickOutside from "../../hooks/useClickOutside";

interface EmojiInputProps {
  value: string;
  onSelection(contentWithEmoji: string): any;
}

const EmojiInput = ({ value, onSelection }: EmojiInputProps) => {
  const [showPicker, setPickerState] = useState(false);
  const picker = useRef<HTMLDivElement>(null);

  const dismissPicker = useCallback(() => {
    setPickerState(false);
  }, [setPickerState]);

  useClickOutside([picker], dismissPicker);

  const togglePicker = () => {
    setPickerState(!showPicker);
  };

  const addEmoji = (emoji: EmojiData) => {
    if ("native" in emoji) {
      onSelection(`${value}${emoji.native}`);
      dismissPicker();
    }
  };

  return (
    <div ref={picker}>
      <div>
        {showPicker && (
          <Picker emoji="" title="" onSelect={addEmoji} />
        )}
      </div>
      <Button onClick={togglePicker}>
        <FunnyEmojiIcon title="Open the emoji selector" />
      </Button>
    </div>
  );
};

export default EmojiInput;
