import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { setCaretPos, useOnClickOutside } from '~/utils/dom';
import TagInput from './TagInput';
import Tag from './Tag';
import { Container } from './Tags.styled';
import { Thread } from '~/@types/resources/thread';
import EmptyTag from './EmptyTag';
import { generateUuid } from '~/utils/id';

interface Props {
  isEditMode: boolean;
  tags: Thread['tags'];
  onChange: (tags: Thread['tags']) => void;
}

const Tags: FC<Props> = ({ isEditMode, tags = [], onChange }) => {
  const tagsRef = useRef(tags);
  const inputRef = useRef<HTMLDivElement>();
  const inputValue = useRef('');
  const [editting, setEditting] = useState(false);

  useEffect(() => {
    tagsRef.current = tags;
  }, [tags]);

  const handleClickContainer = () => {
    if (!isEditMode) return;
    if (!editting) {
      setEditting(true);
    }
    if (inputRef.current) {
      setCaretPos(inputRef.current, inputValue.current ? 1 : 0);
    }
  };

  const handleChangeInput = (value: string) => {
    inputValue.current = value;
  };

  const handleSubmitInput = () => {
    if (!inputValue.current) return;
    onChange(tagsRef.current.concat({ tagId: generateUuid(), value: inputValue.current }));
    inputValue.current = '';
  };

  const handleCancel = () => {
    setEditting(false);
    inputValue.current = '';
  };

  const handleClickDelete = useMemo(() => {
    return (id: number) => onChange(tags.filter((tag) => tag.tagId !== id));
  }, [tags, onChange]);

  const containerRef = useOnClickOutside<HTMLDivElement>(handleCancel);

  return (
    <Container ref={containerRef} isEditMode={isEditMode} onClick={handleClickContainer}>
      {tags?.map(({ tagId, value }) => (
        <Tag
          key={tagId}
          id={tagId}
          title={value}
          editting={editting}
          onClickDelete={handleClickDelete}
        />
      ))}

      <EmptyTag tags={tags} editting={editting} />

      {editting && (
        <TagInput
          ref={inputRef}
          value={inputValue.current}
          onChange={handleChangeInput}
          onCancel={handleCancel}
          onSubmit={handleSubmitInput}
        />
      )}
    </Container>
  );
};

export default memo<FC<Props>>(Tags);
