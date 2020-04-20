import React, { Component } from 'react';
import ItemDetails, {Field} from "../itemDetails";
import GotService from '../../services/gotService';

export default class BooksItem extends Component {

    gotService = new GotService();


    state = {
        selectedItem: 3,
        error: false
    }
    render(){
        return (

            <ItemDetails 
            itemId = {this.props.bookId} 
            getData =  {this.gotService.getBook}
            >
                <Field field='name' label='name'/>
            </ItemDetails>
        )
    }


}