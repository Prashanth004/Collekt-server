import React from 'react';
import './container.css'

export default function InputBox(props) {
    const {placeHolder, onChangeFunct,value} = props;
    var {moreStyle} = props;
    if(moreStyle===undefined) moreStyle={}
    return ( <input type="text" value={value} className="inputText"
     placeholder={placeHolder} onChange={onChangeFunct} style={moreStyle}/>)
}
