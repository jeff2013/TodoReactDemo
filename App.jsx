import React from 'react';
import {Button, Input, Collection, CollectionItem} from 'react-materialize';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            listData: []
        }
        this.updateList = this.updateList.bind(this);
        this.removeFromList = this.removeFromList.bind(this);
    }


    updateList(value){
        //loading temp array because I read in the docs that one shouldn't directly change the state because of the async nature of setState
        var tempArray = this.state.listData;
        tempArray.push(value);
        this.setState({listData: tempArray});
        console.log(value);
    }

    removeFromList(value){
        var tempArray = this.state.listData;
        tempArray.splice(value, 1);
        this.setState({listData: tempArray});
    }


    render() {
        return (
            <div>
                <InputForm onSubmit = {this.updateList}/>
                <TodoCollection listProp = {this.state.listData} rowClickedHandler = {this.removeFromList}/>

            </div>

        );
    }
}

class TodoCollection extends React.Component{
    constructor(){
        super();
        this.printConsole = this.printConsole.bind(this);
    }



    printConsole(event){
        console.log(event.target.attributes.getNamedItem('data').value);
        if (window.confirm("Congratulations on completing your todo!")){
            this.props.rowClickedHandler(event.target.attributes.getNamedItem('data').value);
        }else{

        }

    }

    render(){

        var collectionStyle = {
            marginLeft: '20px',
            marginRight: '20px'
        }

        var collectionItemStyle = {

        }

        return(
            <div style = {collectionStyle}>
            <Collection>
                {this.props.listProp.map((greeting, i) => <CollectionItem style = {collectionItemStyle} data = {i} onClick={this.printConsole}
                                                                          key={i}>{greeting}</CollectionItem>)}
            </Collection>
            </div>
        );
    }
}

class InputForm extends React.Component{

    constructor(){
        super();
        this.state = {
            value: "",
            refusal: false
        };
        this.updateInputValue = this.updateInputValue.bind(this);
        this.submitted = this.submitted.bind(this);
    }

    updateInputValue(event) {
        this.setState({value: event.target.value, refusal: false});
    }

    submitted(){
        if (this.state.value != ""){
            this.props.onSubmit(this.state.value);
            this.setState({value: ""});
        }else {
            if (this.state.refusal) {
                window.alert("Please don't make me do this...")
                this.setState({refusal: true});
            } else {
                window.alert("I refuse to add an empty todo, it goes against my masters wishes.")
                this.setState({refusal: true});
            }
        }
    }

    render(){

        var divStyle = {
            padding: '20px',
        }

        var inlineDiv = {
            //float: 'left'
            width: '50%',
            display: 'inline-block',
        }

        var inputStyle = {
            width: '100%',

        }

        var buttonDiv = {
            display: 'inline-block',
            width: '150px',
            height: '50px',
            margin: '10px',
            //border: '3px solid #73AD21'
        }

        return(
            <div style={divStyle}>
                {/*<input type = "text" value = {this.state.value} onChange = {this.updateInputValue}/>*/}
                <div style = {inlineDiv}>
                    <Input style = {inputStyle} s={6} value = {this.state.value}label="Enter your todo!" onChange={this.updateInputValue} />
                </div>
                <div style = {buttonDiv}>
                    <Button onClick={this.submitted}>Add todo!</Button>
                </div>

            </div>

        );
    }
}




export default App;