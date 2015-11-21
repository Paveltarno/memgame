'use strict';
(function(){
class Login extends React.Component{

  constructor(){
    super();
    this.state = {name: ""};
  }

  handleChange(e){
    this.setState({name: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.submit(e.target.value);
  }

  render(){
    var name = this.state.name;

    return <div className='login'>
    <h3>Login</h3>
    <form onSubmit={this.handleSubmit.bind(this)}>
      <input type="text" placeholder="What is your name?" name="username"
        value={name} onChange={this.handleChange.bind(this)}></input>
      <input type="submit" value={"Login as " + name} disabled={!this.state.name} ></input>
    </form>
    </div>;
  }
}

Login.displayName = "login";
const client = new GameClient("localhost:3000");
const root = document.getElementById('root');
ReactDOM.render(<Login submit={client.login}/>, root);
})();