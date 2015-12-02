'use strict';

class Login extends React.Component{

  constructor(){
    super();
    debugger;
    this.state = {name: "", submitText: _submitText()};
  }

  handleChange(e){
    this.setState({
        name: e.target.value,
        submitText: _submitText(e.target.value)
      });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.submit(this.state.name);
  }

  _submitText(name = nil){
    if(name){
      return "Login as " + name
    }
    else{
      return "Enter name to login"
    }
  }

  render(){
    var name = this.state.name;

    return <div id='login'>
    <h3>Login</h3>
    <form onSubmit={this.handleSubmit.bind(this)}>
      <input type="text" placeholder="What is your name?" className="username" name="username"
        value={name} onChange={this.handleChange.bind(this)}></input>
      <input type="submit" value={this.state.submitText} disabled={!this.state.name} ></input>
    </form>
    </div>;
  }
}
Login.displayName = "Login";

const UserList = ({users}) => {
  return <div id="user-list">
    <div>{users.length + " user(s) connected"}</div>
  </div>
}
UserList.displayName = "UserList";

// Game is the main components
class Game extends React.Component{
  render(){
    return <div id="game">
      <Login submit={this.props.client.login} />
      <UserList users={this.props.users} />
    </div>;
  }
}
Game.displayName = "Game";

$(function(){
  var client = new GameClient("localhost:3000");
  const root = document.getElementById('root');
  var users = [];

  $(client).on("usersUpdate", () => {
    ReactDOM.render(<Game client={client} users={users}/>, root);
  });

  ReactDOM.render(<Game client={client} users={users}/>, root);
});
