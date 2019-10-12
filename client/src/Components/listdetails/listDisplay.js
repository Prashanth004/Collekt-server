import React, { Component } from 'react';
import {getAListDetails} from '../listApi';
import Nav from '../Nav/index'


export default class ListDisplay extends Component {
    constructor(props){
        super(props);
        this.state={ListDetails : {
            id:'',
            name:'',
            cardDetails : []
        },listFetcherror : false}
    }
    
    async componentDidMount(){
        var listId = this.props.match.params.listid;
        try{
            var listDet = await getAListDetails(listId);
            this.setState({
                ListDetails:{
                    id:listId,
                    name:listDet.listName,
                    cardDetails : listDet.vardDetails
                },
                listFetcherror : false
            })
        }
        catch(error){
            this.setState({
                listFetcherror : true
            })
            console.log("error : ",error)
        }
      
    }
    render() {
        const {ListDetails,listFetcherror} = this.state;

        return (
            <div>
                <Nav />
                {listFetcherror?
                (<div>
                    <h1>Error</h1>
                </div>):
            (<div>
                <p>{ListDetails.name}</p>
            </div>)}
            </div>
        )
    }
}


