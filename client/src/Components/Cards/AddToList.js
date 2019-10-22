import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
// import { FiTrash2,FiShare2 } from "react-icons/fi";
import '../index.css'
import { MdPlaylistAdd} from "react-icons/md";
import {addCardToList} from '../cardApi';
import {updateList } from '../../actions/ListAction';
import {updateCards} from '../../actions/cardsAction'


function AddToList(props) {
    const {toggleOpenOtp,openOpt,lists,cards,setdisplatMessage,parentCard} = props;
    const cardId = props.parentCard._id;
   
    const addCardToListLoc = async ( listId)=>{

    var ListToAdded = lists.filter(list=>{ return(list._id === listId) });
    console.log("ListToAdded : ",ListToAdded)
    var ListInCard = false;
    var shouldAdd = false;
    if(ListToAdded.length!==0){
        console.log("ListToAdded[0].Cards_id.find(cardid=>(cardid ===cardId)) : ",ListToAdded[0].Cards_id.find(cardid=>(cardid ===cardId))!==undefined);
        console.log("parentCard.lists.length>2 : ",parentCard.lists.length>3)
        ListInCard = (ListToAdded[0].Cards_id.find(cardid=>(cardid ===cardId))!==undefined);
        shouldAdd = parentCard.lists.length>3 || ListInCard
        console.log("shouldAdd : ",shouldAdd)
    }

        if(!shouldAdd){
            var result = await addCardToList(cardId, listId);
            cards.forEach(card => {
                if(card._id === cardId)
                    card.lists.push(listId)
            }); 
            lists.forEach(list=>{
                if(list._id === listId)
                    list.Cards_id.push(cardId)
            });    
            props.updateCards(cards);
            props.updateList(lists);
            setdisplatMessage({cardid:cardId,display:true,displayData:"Card added successfully"})
            setTimeout(()=>{
                setdisplatMessage({ display:false, displayData:''})
            },2000);
        }
        else{
            setdisplatMessage({cardid:cardId,display:true,displayData:(!ListInCard?"card can not be in more than three lists":"Card already present")})
            setTimeout(()=>{
                setdisplatMessage({cardid:cardId, display:false, displayData:''})
            },2000);
        }
       

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
    lists: state.lists.lists,
    cards : state.cards.cards
})

export default connect(mapStateToProps, {updateList,updateCards })(AddToList)



// export default AddToList
