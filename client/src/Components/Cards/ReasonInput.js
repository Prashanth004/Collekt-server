import React,{useState} from 'react';
import InputBox from '../container/inputBox';
import {changeReason} from '../cardApi'

export default function ReasonInput(props) {
    const {parentCard,setEditMode,setReason} = props;
    console.log("parentCard : ",parentCard)
    const [whyValue, setwhyValue] = useState(parentCard.why)
    const onChangeFunct = (e)=>{
        setwhyValue(e.target.value);
        setReason(e.target.value)
    }
    const updateWhyLoc=async ()=>{
        // updateWhyLoc
        try{
            await changeReason(whyValue,parentCard._id)
        }
        catch(error){
            return("error")
        }
       
        setEditMode(false);

    }
    return (
        <div style={{height:"55px",display:"grid",gridTemplateColumns:"80% 20%",marginLeft:"-7px"}}>
            <InputBox placeHolder="Enter the context/reason" value={whyValue} onChangeFunct={onChangeFunct} moreStyle={{height:"25px", fontSize:"12px"}}/>
            {/* <input type="text" className="form-control" style={{height:"25px", fontSize:"12px"}} /> */}
            <button className="standButton"style={{height:"25px",fontSize:"12px"}} onClick={()=>{updateWhyLoc()}}>Submit</button>
        </div>
    )
}
