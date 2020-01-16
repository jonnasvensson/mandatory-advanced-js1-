import React from 'react';
import io from 'socket.io-client';
import { emojify } from 'react-emojione';
import Linkify from 'react-linkify';


class Chatview extends React.Component {
    constructor(props) {
        super(props); { };
        this.state = {
            message: "",
            messages: [],
            newmessage: [],
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.socket = null;
        this.scrollBar = React.createRef();
        this.handleScrollBar = this.handleScrollBar.bind(this);
    }
    onChange(e) {
        this.setState({ message: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.state.message.length === 0) {
            return;
        }
        let msg = {
            username: this.props.username,
            content: this.state.message,
            id: "own-" + this.state.messages.length,
        };

        this.setState({ messages: [...this.state.messages, msg], message: "" });

        this.socket.emit("message", {
            username: this.props.username,
            content: this.state.message
        }, (response) => {
            console.log("Emitted", response);

        });
    }
    handleScrollBar() {
        this.scrollBar.current.scrollTo(0, this.scrollBar.current.scrollHeight);
    }

    componentDidUpdate() {
        this.handleScrollBar();
    }

    componentDidMount() {
        this.socket = io('http://3.120.96.16:3000'); 

        this.socket.on('messages', data => {
            this.setState({ messages: data });
            console.log(data, data)
        });
        this.socket.on('new_message', data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] })
        })
    }
    componentWillUnmount() {
        this.socket.off()
    }
    render() {
        let p;
        if (this.state.message.length > 200) {
            p = <p className="addingP">Too many characters! <br/> Decrease character to be able to send</p>
        }

        const msglist = this.state.messages.map(data => {
            return <div key={data.id}>
                <p> <strong>{data.username}  says: </strong>  </p>
                <p><Linkify>{emojify(data.content)} </Linkify></p>
            </div>;
        });

        return (
            <>
                <div className="Message-Container" ref={this.scrollBar}>
                    {msglist}
                </div>
                <div className="bottom">
                    <div className="Chat-Input">
                        <form className="formChatview" onSubmit={this.onSubmit}>
                            <textarea value={this.state.message}
                                onChange={this.onChange}
                            />
                            <button className="sendButton">Send</button>
                        </form>
                        <div className="divCount">
                        {this.state.message.length}/200
                                <div className="addingDiv">{p}</div>
                        </div>
                    </div>
                    <div className="bottomLogout">
                        <button className="logOut" onClick={this.props.logOut}>Log out</button>
                    </div>
                </div>
            </>
        );
    }
}


export default Chatview;
