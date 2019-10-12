import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { getAllCards } from '../cardApi';
import {updateList } from '../../actions/ListAction';
import {updateCards} from '../../actions/cardsAction'
import {getAllList} from '../listApi';
import '../index.css'
import Card from './card';
import config from '../../config/config'
import Nav from '../Nav/index';


class IndexHome extends Component {
    constructor(props){
        super(props);
        this.state={cards:[]};
        this.filterCards = this.filterCards.bind(this);
        this.changeCardsSearch = this.changeCardsSearch.bind(this);
    }
    componentDidMount(){
        const {listUpdated,cardsUpdated,updateCards,updateList} = this.props;
        const fetchCards = async () =>{
            try{
                var cards = await getAllCards();
                this.setState({ cards });
                updateCards(cards);
                if(!listUpdated){
                    try{
                        const allList  = await getAllList();
                        updateList(allList);
                    }
                    catch(error){}
                }
            }
            catch(error){}                
        }
        if(!cardsUpdated)
            fetchCards();
        else{
            this.setState({ cards:this.props.cards });
        }
    }
    changeCardsSearch(e){
        this.filterCards({
            type:config.SEARCH_BAR,
            value:e.target.value
        })
    }
    filterCards(obj){
        var newCards = this.props.cards;
        var value = obj.value.toLowerCase();
        if(obj.type === config.SEARCH_BAR){
            newCards = newCards.filter(card=>{
                return(card.why.toLowerCase().includes(value) || card.name.toLowerCase().includes(value))
            })
        }
        this.setState({cards:newCards})
    }

    render() {
        const {  cards } = this.state;
        const {changeCardsSearch} = this;
        const cardsDi = cards.map(card => (<Card card={card} />))

        return (<div><Nav changeSeacrch={changeCardsSearch} /><div className="container cardContainer" >
        {cardsDi}
    </div></div>)
    }
}

IndexHome.PropType = {
    updateCards:PropType.func.updateCards,
    updateList: PropType.func.updateList
};
const mapStateToProps = state => ({
    cards: state.cards.cards,
    listUpdated:state.lists.listUpdated,
    cardsUpdated:state.cards.cardsUpdated
})

export default connect(mapStateToProps, { updateCards,updateList })(IndexHome)


