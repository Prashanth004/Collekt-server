import React,{useState} from 'react';
import '../index.css';
import { FiTrash2 } from "react-icons/fi";
import { MdModeEdit} from "react-icons/md";
import AddToList from './AddToList'
const iconStyle={fontSize:"11px",marginTop:"-10px"}



export default function Card(props) {
    const { card } = props;
    const [openOpt, setopenOpt] = useState(false);
    const toggleOpenOtp = ()=>{
        setopenOpt(!openOpt)
    }
    const [displatMessage, setdisplatMessage] = useState({
        display:false,
        displayData : ''
    })
    return (
        <div className="card cardLoc">

            <div style={{ display: "grid", gridTemplateColumns: "20% 80%", height: "50px", width: "100%" }}>
                <div style={{ width: "90%", height: "100%", margin: "auto"}}>
                    <img src={"/"+card.domain+".jpg"} width="45px" heigh="45px" style={{borderRadius:"50px",marginTop:"3px"}}></img>
                </div>
                <div style={{ textAlign: "right", height: "50px", textAlign: "right",
                display:"grid",gridTemplateColumns:"85% 15%", alignItems: "right" }}>
                    <div></div>
                    <div style={{ width: "40px", height: "15px", display: "grid", gridTemplateColumns: "50% 50%",  }}>
                        <div ><FiTrash2 style={iconStyle}/></div>
                        <div><MdModeEdit style={iconStyle}/></div>
                    </div>
                </div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"80% 20%",height:"23px",width:"100%",paddingLeft:"5px"}}>
                  <div style={{textAlign:"left"}}><p style={{fontSize:"12px"}}>{card.name}</p></div>
                  <div style={{ width: "70px", height: "20px", display: "grid", gridTemplateColumns: "50% 50%"}}>
                        <div><p style={{fontSize:"11px"}}>{card.lists.length -1}</p></div>
                        <div style={{marginTop:"-10px",marginLeft:"-12px"}} ><AddToList openOpt={openOpt} toggleOpenOtp={toggleOpenOtp}
                          cardId={card._id}   setdisplatMessage={setdisplatMessage}/></div>
                    </div>
              </div>
            <div style={{height:"20px",width:"100%",borderTop:"solid",borderWidth:"1px",borderColor:"#ddd",marginTop:"-5px",textAlign:"left",paddingLeft:"5px"}}>
                <p style={{fontSize:"11px",color:"rgb(161, 157, 157)",}}>Reason : {card.why}</p>
            </div>
            <div style={{width:"100%",maxHeight:"20px",backgroundColor:"#ddd",textAlign:"center"}}>
                {displatMessage.display?
                <p style={{fontSize:"12px"}}>{displatMessage.displayData}</p>:null}</div>


        </div>
    )
}
