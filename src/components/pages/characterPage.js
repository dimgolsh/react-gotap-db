import React, { Component } from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from "../itemDetails";
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';


export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedItem: 130,
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
            getData = {this.gotService.getAllCharacters}
            renderItem = {({name,gender}) => `${name} (${gender})`}
            />
        )
        const charDetails = (
            <CharDetails 
            itemId = {this.state.selectedItem} 
            getData =  {this.gotService.getCharacter}
            >
                <Field field='gender' label='gender'/>
                <Field field='born' label='Born'/>
            </CharDetails>
        )
        return (
          <RowBlock left={itemList} right={charDetails}/>
        )
    }
}
