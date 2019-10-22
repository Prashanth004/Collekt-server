import React,{useState} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FiMoreVertical } from 'react-icons/fi';
import { FiTrash2, FiShare2 } from "react-icons/fi";
import '../index.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {updateList } from '../../actions/ListAction';
import {updateCards} from '../../actions/cardsAction';
import { connect } from 'react-redux';


function ListOpt(props) {
    const { toggleOpenOtp, openOpt ,deleteList,parentList,lists,cards} = props;
    const listId = parentList._id;
    const lengthOfCards = parentList.Cards_id.length;
    const [openDelete, setopenDelete] = useState(false);
    const toggleDeleteModal = ()=>{
        setopenDelete(!openDelete)
    }
    const deleteListLoc = async (listId) =>{
        try{
            await deleteList(listId);
        }catch(error){
            return 'error'
        }
       var newList = lists.filter(list=>{return(list._id!==listId)});
       cards.forEach(card => {
        card.lists = card.lists.filter(value=>{return(value!==listId)})
       });
       props.updateCards(cards);
       props.updateList(newList);
        
    }
    return (
        <div>
            <Dropdown className="mainDropDownContain" isOpen={openOpt} toggle={toggleOpenOtp}>
                <DropdownToggle style={{ borderStyle: "none", outline: "none" }} className="optionToggle">
                    <FiMoreVertical style={{ color: "black" }} />
                </DropdownToggle >
                <DropdownMenu className="mainDropDown">
                    <DropdownItem className="dropItem" onClick={()=>{setopenDelete(true)}}>Delete  <FiTrash2 /></DropdownItem>
                    <DropdownItem className="dropItem">Share <FiShare2 /></DropdownItem>

                </DropdownMenu>
            </Dropdown>
            <Modal isOpen={openDelete} toggle={toggleDeleteModal} >
                <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
                <ModalBody>
                 Are you sure you want to delete this list? It has {lengthOfCards} cards in it. You wont be able to retieve it back.
          </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={()=>{toggleDeleteModal();
                        deleteListLoc(listId)}}>Delete</Button>{' '}
                    <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
const mapStateToProps = state => ({
    lists: state.lists.lists,
    cards : state.cards.cards
})

export default connect(mapStateToProps, {updateList,updateCards })(ListOpt)

