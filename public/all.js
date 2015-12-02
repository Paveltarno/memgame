'use strict';

function GameClient(url) {
  var _this = this;

  var socket = io(url);

  this.login = function (name) {
    socket.emit('users:login', {
      name: name
    });
  };

  socket.on('users:update', function (data) {
    $(_this).trigger('usersUpdate');
  });
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = (function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login() {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this));

    debugger;
    _this.state = { name: "", submitText: _submitText() };
    return _this;
  }

  _createClass(Login, [{
    key: "handleChange",
    value: function handleChange(e) {
      this.setState({
        name: e.target.value,
        submitText: _submitText(e.target.value)
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      this.props.submit(this.state.name);
    }
  }, {
    key: "_submitText",
    value: function _submitText() {
      var name = arguments.length <= 0 || arguments[0] === undefined ? nil : arguments[0];

      if (name) {
        return "Login as " + name;
      } else {
        return "Enter name to login";
      }
    }
  }, {
    key: "render",
    value: function render() {
      var name = this.state.name;

      return React.createElement(
        "div",
        { id: "login" },
        React.createElement(
          "h3",
          null,
          "Login"
        ),
        React.createElement(
          "form",
          { onSubmit: this.handleSubmit.bind(this) },
          React.createElement("input", { type: "text", placeholder: "What is your name?", className: "username", name: "username",
            value: name, onChange: this.handleChange.bind(this) }),
          React.createElement("input", { type: "submit", value: this.state.submitText, disabled: !this.state.name })
        )
      );
    }
  }]);

  return Login;
})(React.Component);

Login.displayName = "Login";

var UserList = function UserList(_ref) {
  var users = _ref.users;

  return React.createElement(
    "div",
    { id: "user-list" },
    React.createElement(
      "div",
      null,
      users.length + " user(s) connected"
    )
  );
};
UserList.displayName = "UserList";

// Game is the main components

var Game = (function (_React$Component2) {
  _inherits(Game, _React$Component2);

  function Game() {
    _classCallCheck(this, Game);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Game).apply(this, arguments));
  }

  _createClass(Game, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "game" },
        React.createElement(Login, { submit: this.props.client.login }),
        React.createElement(UserList, { users: this.props.users })
      );
    }
  }]);

  return Game;
})(React.Component);

Game.displayName = "Game";

$(function () {
  var client = new GameClient("localhost:3000");
  var root = document.getElementById('root');
  var users = [];

  $(client).on("usersUpdate", function () {
    ReactDOM.render(React.createElement(Game, { client: client, users: users }), root);
  });

  ReactDOM.render(React.createElement(Game, { client: client, users: users }), root);
});
//# sourceMappingURL=all.js.map
