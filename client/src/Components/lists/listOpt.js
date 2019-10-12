import React,{useState} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FiMoreVertical } from 'react-icons/fi';
import { FiTrash2, FiShare2 } from "react-icons/fi";
import '../index.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';


function ListOpt(props) {
    const { toggleOpenOtp, openOpt ,deleteList,listId} = props;
    const [openDelete, setopenDelete] = useState(false);
    const toggleDeleteModal = ()=>{
        setopenDelete(!openDelete)
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
                 Are you sure you want to delete ? You wont be able to retieve it back.
          </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={()=>{toggleDeleteModal();
                        deleteList(listId)}}>Delete</Button>{' '}
                    <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ListOpt
