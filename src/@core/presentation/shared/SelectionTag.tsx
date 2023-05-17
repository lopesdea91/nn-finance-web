import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Breadcrumbs, Chip } from '@mui/material';
import { FinanceTagShort } from '@/types/entities/finance-tag';
import { AppText } from './base';

type Props = {
  tags: FinanceTagShort[]
  error?: string
  value: FinanceTagShort[]
  onChange: (args: FinanceTagShort[]) => void
  disabled?: boolean
}
export const SelectionTag = (props: Props) => {
  const eventInternal = useRef<boolean>(true)
  const [tagChecked, setTagChecked] = useState<FinanceTagShort[]>(props.value);

  const tagIsChecked = (id: number): boolean => {
    return tagChecked?.map(el => el.id).includes(id)
  }
  const handleToggle = (item: FinanceTagShort) => {
    const findItem = !!tagChecked.find(el => el.id === item.id);

    const newTagChecked = [...tagChecked];

    if (findItem) {
      const currentIndex = newTagChecked.map(el => el.id).indexOf(item.id);
      newTagChecked.splice(currentIndex, 1);
    } else {
      newTagChecked.push(item);
    }

    setTagChecked(newTagChecked);

    eventInternal.current = false

    props.onChange(newTagChecked)
  };

  useEffect(() => {
    if (eventInternal.current) {
      setTagChecked(props.value)
    }
    eventInternal.current = true
  }, [props.value])

  return (
    <TagContainer error={!!props.error}>
      <TagChecked>
        {tagChecked?.map(el => <TagCheckedItem key={el.id}>{el.description}</TagCheckedItem>)}

        {(tagChecked?.length === 0) ?
          props.error
            ? <TagCheckedItem color="#d32f2f">{props.error}</TagCheckedItem>
            : <TagCheckedItem>Selecione uma tag</TagCheckedItem>
          : null
        }

      </TagChecked>
      <TagList>
        {props.tags.map((item) => (
          <TagListItem
            key={item.id}
            label={item.description}
            variant={tagIsChecked(item.id) ? 'filled' : 'outlined'}
            onClick={() => handleToggle(item)}
            disabled={props.disabled}
          />
        ))}
        {props.tags.length ? null : (
          <TagCheckedItem>Crie uma tag para poder continuar o cadastro!</TagCheckedItem>
        )}
      </TagList>
    </TagContainer>
  );
}

const TagContainer = styled.div<{ error: boolean }>`
  border: 1px solid ${p => p.error ? '#d32f2f' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 4px;
`
const TagChecked = styled(Breadcrumbs)`
  padding: 0.5rem 0.25rem;
  background: rgba(0, 0, 0, 0.015);
`
const TagCheckedItem = styled(p => <AppText variant='body1' {...p} />)`
`
const TagList = styled.ul`
  min-height: 4.35rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem 0.25rem;
  margin: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);;
  background: rgba(0, 0, 0, 0.015);
`
const TagListItem = styled((p) => <Chip size='small' clickable {...p} />)`
`