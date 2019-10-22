import {UPDATE_CARDS} from './types';


export const updateCards = (cards)=>(dispatch)=>{
    dispatch({
        type:UPDATE_CARDS,
        payload:cards
    })
}

// export const updateCardsAndList = (cardId,listId)=>{
//     cards.forEach(card => {
//         if(card._id === cardId)
//             card.lists.push(listId)
//     }); 
//     lists.forEach(list=>{
//         if(list._id === listId)
//             list.Cards_id.push(cardId)
//     });    
//     props.updateCards(cards);
//     props.updateList(lists);
// }