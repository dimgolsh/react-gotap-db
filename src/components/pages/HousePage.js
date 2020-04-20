import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from "../itemDetails";
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';


export default class HousePage extends Component {

    gotService = new GotService();

    state = {
        selectedItem: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }
  
    componentDidCatch(){
        console.log('error');
        this.setState({
            error: true
        })
    }

    render(){

        if(this.state.error){
            return <ErrorMessage/>;
        }

        const itemList = (
            <ItemList
            onItemSelected = {this.onItemSelected}
            getData = {this.gotService.getAllHouses}
            renderItem = {({name}) => `${name}---`}
            />
        )
        const itemDetails = (
            <ItemDetails 
            itemId = {this.state.selectedItem} 
            getData =  {this.gotService.getHouse}
            >
                <Field field='name' label='name'/>
            </ItemDetails>
        )
        return (

          <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}
