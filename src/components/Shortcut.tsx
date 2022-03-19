import React from "react";
import styled from "styled-components";
import close from "../img/close.svg";

interface Shortcuts {
  title: string;
  icon: string;
  link: string;
}

interface Props {
  items: Shortcuts[];
  deleteShortcut: any;
}

const Shortcut: React.FC<Props> = ({ items, deleteShortcut }) => (
  <React.Fragment>
    {items.map((item: Shortcuts) => (
      <ShortcutContainer>
        <ShortcutTile>
          <DeleteShortcut
            onClick={() => {
              deleteShortcut(item.link);
            }}
          >
            <img src={close} alt="trash" />
          </DeleteShortcut>
          <ShortcutLink href={item.link}>
            <ShortcutIcon>
              <img src={item.icon} alt={item.title} />
            </ShortcutIcon>
            <ShortcutText>
              <p>{item.title}</p>
            </ShortcutText>
          </ShortcutLink>
        </ShortcutTile>
      </ShortcutContainer>
    ))}
  </React.Fragment>
);

const ShortcutContainer = styled.div`
  height: 110px;
  min-width: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ShortcutTile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ShortcutLink = styled.a`
  height: 100%;
  color: var(--fontColor);
  position: relative;
  outline: none;
  text-align: center;
  cursor: pointer;
  padding: 10px 15px;
  background: transparent;
  border: none;
  border-radius: 10px;
  width: auto;
  transition: all ease-in-out 10ms;
  :hover {
    color: var(--fontColor);
    background: var(--tileback);
  }
`;
const ShortcutIcon = styled.div`
  padding: 10px;
  margin: 1px 10px 10px 10px;
  border-radius: 15px;
  background: var(--tilebox);
  img {
    user-select: none;
    height: 24px;
    width: 24px;
    margin: 7px;
  }
`;
const ShortcutText = styled.div`
  p {
    user-select: none;
    margin: 0;
    font-family: Roboto, "Segoe UI", Tahoma, sans-serif;
    font-size: 13px;
  }
`;
const DeleteShortcut = styled.button`
  position: absolute;
  right: 0px;
  user-select: none;
  top: 0px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;

  img {
    padding: 2px;
    opacity: 0;
    margin: 0;
    background: var(--tilebox);
    border-radius: 10px;
    height: 20px;
    width: 20px;
    cursor: pointer;
    transition: 100ms all ease-in-out;
    :hover {
      opacity: 8;
    }
  }
`;

export default Shortcut;
