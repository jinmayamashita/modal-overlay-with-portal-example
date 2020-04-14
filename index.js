import React, { useState, useEffect } from "react";
import { render, createPortal } from "react-dom";
import styled from "styled-components";
import "./style.css";

const Modal = styled(({ className, toggleModal }) => {
  const onClick = e => {
    e.preventDefault();
    console.log("onClick Modal");
  };

  const onMouseDown = e => {
    e.preventDefault();
    console.log("onMouseDown Modal");
  };

  return (
    <div className={className} onClick={onClick} onMouseDown={onMouseDown}>
      <button onClick={toggleModal}>close modal</button>
    </div>
  );
})`
  z-index: 2;
  position: relative;
  border-radius: 4px;
  width: 400px;
  height: 300px;
  background-color: #fff;
  padding: 50px;
  margin: 0 auto;
`;

const Overlay = styled(({ className, children }) => {
  const onClick = e => {
    e.preventDefault();
    console.log("onClick Overlay");
  };

  return (
    <>
      <div className={className} onClick={onClick} />
      {createPortal(children, document.getElementById("modal-root"))}
    </>
  );
})`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
`;

const App = styled(({ className }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className={className}>
      <button onClick={toggleModal}>open modal</button>

      {isModalOpen ? (
        <Overlay>
          <Modal toggleModal={toggleModal} />
        </Overlay>
      ) : null}
    </div>
  );
})`
  position: relative;
  overflow: hidden;
`;

render(<App />, document.getElementById("root"));
