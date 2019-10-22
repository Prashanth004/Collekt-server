import React,{useState} from 'react';
import { FiTrash2 } from "react-icons/fi";
import { removeCardFromList } from '../listApi';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {updateList } from '../../actions/ListAction';
import {updateCards} from '../../actions/cardsAction';
import { connect } from 'react-redux';



function ListCard(props) {
    const { card, listId,allCards,allLists } = props;
    const removeCardFromListMain = props.removeCardFromList
    const [openDelete, setopenDelete] = useState(false);
    const toggleDeleteModal = () => {
        setopenDelete(!openDelete)
    };
    const removeCardFromListLoc = async (cardId,listId)=>{
        try{
            await removeCardFromList(cardId,listId)
        }catch(error){
            console.log("error : ",error)
            return "failed"
        }
        removeCardFromListMain(cardId);

        allCards.forEach(card => {
            if(card._id === cardId)
            card.lists = card.lists.filter(value=>{
                    return value!==listId
                })
        }); 
        allLists.forEach(list=>{
            if(list._id === listId)
            list.Cards_id = list.Cards_id.filter(value=>{
                    return value!==cardId
                })
        });    
        props.updateCards(allCards);
        props.updateList(allLists);

       

    }
    return (
        <div style={{ width: "95%", margin: "auto", textAlign: "left", backgroundColor: "white", height: "65px", marginTop: "5px", display: "grid", gridTemplateColumns: "25% 75%" }}>
            <div style={{ width: "45px", height: "45px", margin: "auto" }}>
                <img width="100%" src={"/" + card.domain + ".jpg"} />
            </div>
            <div style={{ display: "grid", paddingTop: "15px", textAlign: "left", gridTemplateColumns: "80% 20%" }}>
                <div style={{ textAlign: "left" }}>  <p>{card.name}</p></div>
                <div ><span onClick={() => { toggleDeleteModal() }}><FiTrash2 /></span></div>

            </div>
            <Modal isOpen={openDelete} toggle={toggleDeleteModal} >
                <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to remove card from list ? You wont be able to retieve it back.
          </ModalBody>
                <ModalFooter>
                    <Button color="danger" 
                     onClick={()=>{removeCardFromListLoc(card._id, listId);toggleDeleteModal();}}>Delete</Button>{' '}
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

export default connect(mapStateToProps, {updateList,updateCards })(ListCard)





