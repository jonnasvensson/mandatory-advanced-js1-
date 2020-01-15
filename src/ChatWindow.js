import React from 'react';

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.onChange = this.onChange.bind(this);
    }
    onSubmit (value) {
        this.setState({value: value});
    }
    onChange (e) {
        this.setState({value:e.target.value});
        }
    render() {
        return (
            <>
            <Paragraf value={this.state.value} onSubmit={this.onSubmit} />
            <input anything={this.onChange} value={this.state.value}/>
            <Button />
            </>
        )
    }
}


class Paragraf extends React.Component {
    render() {
        return (
            <p>Message {this.props.value}</p>
        )
    }
}

class Button extends React.Component {
    constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        this.props.onSubmit(e.target.value);
    }
    render(props) {
        return (
            <button 
            onSubmit={props.onSubmit}>
                 {props.value}
            Submit </button>
        )
    }
}



export default ChatWindow