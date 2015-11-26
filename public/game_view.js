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

    _this.state = { name: "" };
    return _this;
  }

  _createClass(Login, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({ name: e.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      this.props.submit(e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var name = this.state.name;

      return React.createElement(
        'div',
        { className: 'login' },
        React.createElement(
          'h3',
          null,
          'Login'
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleSubmit.bind(this) },
          React.createElement('input', { type: 'text', placeholder: 'What is your name?', name: 'username',
            value: name, onChange: this.handleChange.bind(this) }),
          React.createElement('input', { type: 'submit', value: "Login as " + name, disabled: !this.state.name })
        )
      );
    }
  }]);

  return Login;
})(React.Component);

Login.displayName = "login";

var client = new GameClient("localhost:3000");
var root = document.getElementById('root');
ReactDOM.render(React.createElement(Login, { submit: client.login.bind(client) }), root);
