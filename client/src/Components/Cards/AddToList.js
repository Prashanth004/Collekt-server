import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
// import { FiTrash2,FiShare2 } from "react-icons/fi";
import '../index.css'
import { MdPlaylistAdd} from "react-icons/md";
import {addCardToList} from '../cardApi'


function AddToList(props) {
    const {toggleOpenOtp,openOpt,lists,cardId,setdisplatMessage} = props;
    const addCardToListLoc = async ( listId)=>{
        var result = await addCardToList(cardId, listId);
        console.log(result);
        setdisplatMessage({display:true,displayData:"Card added successfully"})
        setTimeout(()=>{
            setdisplatMessage({ display:false, displayData:''})
        },2000)
    }

    return (
        <div>
            <Dropdown isOpen={openOpt} toggle={toggleOpenOtp}>
                <DropdownToggle style={{borderStyle:"none",  outline:"none"}}className="optionToggle">
                <MdPlaylistAdd style={{color:"black"}}/>
        </DropdownToggle>
                <DropdownMenu  className="mainDropDown">
                {lists.map(list=>( <DropdownItem className="dropItem" id={list._id}
                    onClick={(e)=>{addCardToListLoc(e.target.id)}}
                >{list.List_name}</DropdownItem>))}
                <button style={{width:"100%", margin:"auto",borderStyle:"none",backgroundColor:"rgb(141, 141, 141)",borderRadius:"3px",color:"white",height:"20px",paddingTop:"0px"}}>Create a List</button>

                   
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
const mapStateToProps = state => ({
    lists: state.lists.lists
})

export default connect(mapStateToProps, { })(AddToList)



// export default AddToList
