import React,{useState,useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {updateList } from '../../actions/ListAction';
import { FiTrash2 } from "react-icons/fi";
import {updateCards} from '../../actions/cardsAction';
import { connect } from 'react-redux';
import {deleteCardApi} from '../cardApi';
import TestTemp from './TestTemp'
const iconStyle={fontSize:"11px",marginTop:"-10px"}

function DeleteCard(props) {
    const {parentCard,deleteCard,allCards,allLists,updateList,updateCards } = props;
    const [openDelete, setopenDelete] = useState(false);
    const filterLists = ()=>{
        return new Promise((resolve,reject)=>{
            console.log("allLists : ",allLists)
            var ListName = allLists.filter(list=>{
                return(list.Cards_id.includes(parentCard._id))
            })
            resolve(ListName)
        })
       
    }
    const [ListNames, setListNames] = useState([]);
  
    const toggleDeleteModal = async () => {
        if(openDelete===false){
            var newListName = await filterLists();
            console.log("newListName : ",newListName)
        setListNames(newListName)
        }
        
        setopenDelete(!openDelete)
    };
   
    const deletCardLoc= async()=>{
        try{
            await deleteCardApi(parentCard._id)
        }
        catch(error){
            return "error"
        }
        deleteCard(parentCard._id);
        var newCards = allCards.filter(card=>{
            return(card._id!==parentCard._id)
        });
        allLists.forEach(list => {
            list.Cards_id = list.Cards_id.filter(cardid=>{
                return(cardid!==parentCard._id)
            })
        });
        updateCards(newCards);
        updateList(allLists)
    }
    const deleteExtraInfo =  parentCard.lists.length>1 ? "Card is present in \n"+String(parentCard.lists.length-1)+" lists.":""
    return (
             <div >
                 <FiTrash2 style={iconStyle} onClick={toggleDeleteModal}/>
                 <Modal isOpen={openDelete} toggle={toggleDeleteModal} >
                <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
                <ModalBody>
                    {deleteExtraInfo}<br/> {parentCard.lists.length>1?ListNames.map(listName=><TestTemp listName={listName}/>):""} Are you sure you want to delete the card? You wont be able to retieve it back.
          </ModalBody>
                <ModalFooter>
                    <Button color="danger" 
                     onClick={()=>{deletCardLoc();toggleDeleteModal();}}>Delete</Button>{' '}
                    <Button color="secondary" onClick={() => { toggleDeleteModal();}}>Cancel</Button>
                </ModalFooter>
            </Modal>
                 </div>
    )
}

const mapStateToProps = state => ({
    allLists: state.lists.lists,
    allCards : state.cards.cards
})

export default connect(mapStateToProps, {updateList,updateCards })(DeleteCard)


