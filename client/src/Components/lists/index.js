import { connect } from 'react-redux';
import PropType from 'prop-types';
import {updateList } from '../../actions/ListAction';
import { getAllList, createNewList,deleteList } from '../listApi';
import { InputGroup, Button, InputGroupAddon, Input } from 'reactstrap';
import '../index.css';
import {updateCards} from '../../actions/cardsAction';
import { getAllCards } from '../cardApi';
import Nav from '../Nav/index';
import List from './list';

import React, { Component } from 'react';

const filterTextFromCards = (cards,list,text)=>{
    return new Promise((resolve,reject)=>{
       
        var newCards = cards.filter(card=>{
            return (card.lists.find(cardList=>(cardList===list._id)))
        })
        newCards = newCards.filter(card=>{
            return (card.name.toLowerCase().inclueds(text)||card.why.toLowerCase().includes(text))
        })
        console.log("newCards : ",newCards)
        if(newCards.length>0)
            resolve(true)
        else    
            resolve(false)
    })
}
class IndexList extends Component {
    constructor(props) {
        super(props)
        this.state = { ListName: '',lists:[],showSuccess:false}
        this.setListName = this.setListName.bind(this);
        this.createList = this.createList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.changeListSeacrch = this.changeListSeacrch.bind(this)
    }
    async componentDidMount() {
        if(!this.props.listUpdated){
            const allList  = await getAllList();
            this.setState({lists:allList})
            this.props.updateList(allList);
        }
        else{
            this.setState({lists:this.props.lists})
        }
        const fetchCards= async ()=>{
            var cards = await getAllCards();
            this.props.updateCards(cards);
        }
        if(!this.props.cardsUpdated)
            fetchCards();      
      
    }
    async createList(ListName){
      const newList = await createNewList(ListName);
      var presList = this.state.lists;
      presList.push(newList);
      this.setState({lists:presList,showSuccess:true, ListName: ''});
      setTimeout(()=>{
        this.setState({showSuccess:false})
      },2000);
      this.props.updateList(presList);
    }
    async deleteList(Listid){
        await deleteList(Listid);
        var presList = this.state.lists;
        presList =this.state.lists.filter(list=>{
            return(list._id!==Listid)});
        this.setState({lists:presList});
        this.props.updateList(presList);
    }
    setListName(e) {this.setState({ListName: e.target.value})};
    changeListSeacrch(e){
        var newList = this.props.lists;
        var value = e.target.value.toLowerCase();
        newList = newList.filter(list=>{
            // var cardSe = await filterTextFromCards(this.props.cards,list,value.toLowerCase());
            var newCards = this.props.cards.filter(card=>{
                return (card.lists.find(cardList=>(cardList===list._id)))
            })
            console.log("newCards :",newCards)
            newCards = newCards.filter(card=>{
                return (card.name.toLowerCase().includes(value)||card.why.toLowerCase().includes(value))
            })
            var listSe = list.List_name.toLowerCase().includes(value)
            console.log("cardSearch,listSe : ",newCards,listSe)
            return(listSe || newCards.length>0)
        })
        this.setState({lists:newList})
    }

    render() {
        console.log("rerendering")
        const {ListName,showSuccess,lists} = this.state;
        const {setListName,createList,deleteList,changeListSeacrch}= this;
     
        
        return (
            <div> 
                <Nav changeSeacrch={changeListSeacrch}/>
            <div className="container" >
                <div style={{ width:"100%", marginTop: "20px" }}>
                    <InputGroup style={{width: "350px", margin: "auto"}}>
                        <Input type="text" placeholder="Enter list name" value={ListName} onChange={setListName} />
                        <InputGroupAddon addonType="append">
                      
                            <Button style={{backgroundColor:"#976c9e"}} onClick={()=>{createList(ListName)}}>Create List</Button></InputGroupAddon>
                        
                    </InputGroup>
                </div>
                {showSuccess?<p>Created list successfully !!</p>:null}
                <div className="cardContainer">
                {lists.map(list => (<List list={list}deleteList={deleteList}/>))}
                </div>
            </div></div>
        )
    }
}

IndexList.PropType = {
    updateList: PropType.func.updateList,
    updateCards: PropType.func.updateCards
};
const mapStateToProps = state => ({
    lists: state.lists.lists,
    cards : state.cards.cards,
    listUpdated:state.lists.listUpdated,
    cardsUpdated:state.cards.cardsUpdated
    
})

export default connect(mapStateToProps, {updateList,updateCards})(IndexList)


