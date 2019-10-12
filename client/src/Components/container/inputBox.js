import React from 'react'

export default function InputBox(props) {
    const {placeHolder, onChangeFunct} = props;
    return ( <input type="text" placeholder={placeHolder} onChange={onChangeFunct}
    style={{borderStyle:"solid",borderWidth:"1px", borderColor:"#ddd",borderRadius:"3px",padding:"3px",paddingLeft:"8px", width:"350px"}}/>)
}
