import React from "react";

function InfoToolTip(props) {
  const { messageTooltip } = props;
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_open`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__content" 
        style={{ display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 430,
        height: 330,
      }}>
       <img
          className="tooltipPic"
          style={{ 
            width: 120,
            height: 120,
            paddingTop: 60,
          }}
          alt={messageTooltip.message}
          src={messageTooltip.img}
        ></img>
        <button
          className="popup__close-button"
          onClick={props.onClose}
          type="button"
        ></button>
        <h2
          className="popup__title"
          style={{ 
            textAlign: "center", 
            marginLeft: 12,
             }}
        >
          {messageTooltip.message}
        </h2>
      </div>
    </div>
  );
}

export default InfoToolTip;