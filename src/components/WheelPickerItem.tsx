import React, {
  forwardRef,
  useMemo,
  FocusEventHandler,
  MouseEventHandler
} from "react";
import styled from "styled-components";
import { OPTION_ID } from "../constants/optionID";

const Item = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
  ${(props: { height: number; selected: boolean }): string => `
    min-height: ${props.height}px;
    ${
      props.selected
        ? `
    background: #EEEEF0;
    border-radius: 6px;
    `
        : ""
    }
  `}
  &:focus {
    outline: none;
  }
`;

const Text = styled.p`
  margin: 0;
  text-align: left;
  word-wrap: break-word;
  padding-left: 10px;
`;

export interface WheelPickerItemProps {
  id: string;
  value: string | number;
  activeID: string;
  height: number;
  color: string;
  activeColor: string;
  fontSize: number;
  onClick?: MouseEventHandler;
  onFocus?: FocusEventHandler;
}

const WheelPickerItem: React.FC<WheelPickerItemProps> = (
  {
    id,
    value,
    activeID,
    height,
    color,
    activeColor,
    fontSize,
    onClick,
    onFocus
  },
  ref
) => {
  const selected = useMemo(() => id === activeID, [id, activeID]);
  const textColor = useMemo(() => (selected ? activeColor : color), [
    activeColor,
    color,
    selected
  ]);
  const textStyle = useMemo(
    () => ({
      color: textColor,
      fontSize
    }),
    [fontSize, textColor]
  );
  return (
    <Item
      role="option"
      selected={selected}
      aria-selected={selected}
      aria-label={value.toString()}
      ref={ref}
      id={`${OPTION_ID}${id}`}
      data-itemid={id}
      data-itemvalue={value}
      height={height}
      onClick={onClick}
      onFocus={onFocus}
      tabIndex={0}
    >
      <Text style={textStyle}>{value}</Text>
    </Item>
  );
};

export default forwardRef<HTMLLIElement, WheelPickerItemProps>(WheelPickerItem);
