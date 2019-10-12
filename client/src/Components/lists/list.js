import React,{useState} from 'react';
import '../index.css';
// import '../Cards/cards.css';
import ListOpt from './listOpt';
import { Redirect } from 'react-router-dom';


const List = (props) => {
    const {list,deleteList} = props;
    const [openOpt, setopenOpt] = useState(false);
    const [OpenListDetails, setOpenListDetails] = useState({
        openDetails:false,
        id:''
    })
    const toggleOpenOtp = ()=>{
        setopenOpt(!openOpt)
    }
    console.log("list : ",list)
    return (!OpenListDetails.openDetails?
        <div  className="cardLoc list" style={{minHeight:"60px",display:"grid",gridTemplateColumns:"80% 20%",padding:"7px"}}>
           <div style={{height:"46px",textAlign:"left"}}><p style={{fontSize:"12px"}}
           onClick={()=>{setOpenListDetails({
            openDetails:true,
            id:list._id
        })}}>{list.List_name}</p></div> 
           
           <div style={{textAlign:"right"}}>
           <ListOpt openOpt={openOpt} toggleOpenOtp={toggleOpenOtp}deleteList={deleteList} listId={list._id}/>
             </div>
        </div>:(<Redirect to={{ pathname: '/list/'+OpenListDetails.id }}/>)
    )
}

export default List
