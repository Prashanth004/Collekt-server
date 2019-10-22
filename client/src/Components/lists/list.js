
import '../index.css';
// import '../Cards/cards.css';
import ListOpt from './listOpt';
import { Redirect } from 'react-router-dom';
import ListCard from './ListCard'


import React, { Component } from 'react'
class List extends Component {
    constructor(props){
        super(props)
        this.state={openOpt : false,
            cards : {
                cardetails:[],
                fetchedCards:false
            },
            OpenListDetails:{
            openDetails:false,
            id:''
        }}
        this.toggleOpenOtp = this.toggleOpenOtp.bind(this);
        this.setOpenListDetails = this.setOpenListDetails.bind(this);
        this.removeCardFromList = this.removeCardFromList.bind(this);
    }
    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    // componentDidUpdate(){
    //   var myCards = this.props.cards.filter(card=>{
    //     return(card.lists.find(list=>(list === this.props.list._id)))
    //   });
    //   this.setState({cards:{
    //     cardetails:myCards,
    //     fetchedCards:true
    //   }});
    // }
    componentDidMount(){
      
        var myCards = this.props.cards.filter(card=>{
          return(card.lists.find(list=>(list === this.props.list._id)))
        });
        this.setState({cards:{
          cardetails:myCards,
          fetchedCards:true
        }});

        console.log("myCards : ",myCards)
     
    }

    removeCardFromList(cardId){
      var cards = this.state.cards.cardetails;
      console.log("cards : ",cards);
      console.log("carsId : ",cardId);
      var newCards = cards.filter(card=>{
        return(card._id!==cardId)
      });
      this.setState({
        cards : {
          cardetails: newCards,
          fetchedCards:false
      }})
    }
    
    toggleOpenOtp(){
        this.setState({openOpt:!this.state.openOpt})
    }
    setOpenListDetails(obj){
            this.setState({OpenListDetails:obj})
    }

    render() {
        const {openOpt,OpenListDetails,cards} = this.state;
        const {list,deleteList} = this.props;
        const {toggleOpenOtp,setOpenListDetails,removeCardFromList} = this;
        console.log("cardetails : ",cards.cardetails)
        const cardsLists = cards.cardetails.map(card=>(<ListCard card={card} listId={list._id} removeCardFromList={removeCardFromList} />))
           return (!OpenListDetails.openDetails?
            (<div  className="cardLoc" style={{paddingBottom:"7px"}}>
        <div  style={{minHeight:"60px",display:"grid",gridTemplateColumns:"80% 20%",padding:"7px"}}>
           <div style={{height:"46px",textAlign:"left"}}><p style={{fontSize:"12px"}}
           onClick={()=>{setOpenListDetails({
            openDetails:true,
            id:list._id
        })}}>{list.List_name}</p></div> 
           
           <div style={{textAlign:"right"}}>
           <ListOpt openOpt={openOpt} toggleOpenOtp={toggleOpenOtp}deleteList={deleteList} parentList={list}/>
             </div>
           
           </div>
           <div style={{width:"98.5%",margin:"auto", backgroundColor:"#ddd",height:"300px",
          overflowX: "auto"}}
          ref={(el) => { this.messagesEnd = el; }}>
         {cardsLists}
                  </div>
           </div>):(<Redirect to={{ pathname: '/list/'+OpenListDetails.id }}/>)
    )
    }
}


export default List
