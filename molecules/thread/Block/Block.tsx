import styled from '@emotion/styled';
import { FC, KeyboardEvent, useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { Container } from './Block.styled';
import { BlockProps } from './types';

const Block: FC<BlockProps> = ({
  className,
  editable,
  multiline = true,
  placeholder,
  value,
  onChange,
  onKeyPressEnter,
}) => {
  const domRef = useRef<ContentEditable>();

  const handleChange = ({ target }: ContentEditableEvent) => {
    onChange(target.value ?? '');
  };

  const handleKeyPress = (event: ContentEditableEvent & KeyboardEvent) => {
    const { key, shiftKey } = event;

    if (key === 'Enter') {
      if (!shiftKey) {
        onKeyPressEnter?.(domRef.current?.el.current);
      }
      if (!multiline) {
        event.preventDefault();
      }
    }
  };

  return (
    <Container
      ref={domRef}
      spellCheck="false"
      autoCapitalize="off"
      autoCorrect="off"
      data-block="true"
      className={className}
      placeholder={placeholder}
      disabled={!editable}
      html={value ?? ''}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default styled(Block)``;