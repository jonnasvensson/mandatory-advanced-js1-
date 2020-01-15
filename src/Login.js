import React from 'react';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            ok: true,
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickButton = this.onClickButton.bind(this);

    }
    onChangeInput(e) {
        this.setState({ username: e.target.value })
        console.log(this.state.username);
    }
    onClickButton(e) {
        e.preventDefault();
        let valid = /^[^-\s][a-zA-Z0-9-_\s?]{1,12}$/.test(this.state.username);
        console.log(valid);

        if (valid) {
            this.props.onSubmit(this.state.username);
            console.log(this.state.username);
        } else {
            console.log('fel');
        }
        this.setState({ ok: valid });
        console.log(this.state.username);
    }
    render() {
        let p;
        if (this.state.ok === false) {
            p = <p>Invalid username, please use 1-12 characters</p>;
        }
        return (
            <>
                <form onSubmit={this.onClickButton}>
                    <input type="text" placeholder="Namn"
                        onChange={this.onChangeInput}
                    />
                    {p}
                    <div>
                        <button >Start chatting</button>
                    </div>
                </form>
            </>
        );
    }
}

export default Login;

