(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-bootstrap'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-bootstrap'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactBootstrap);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _reactBootstrap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Simulador = function (_React$Component) {
    _inherits(Simulador, _React$Component);

    function Simulador(props) {
      _classCallCheck(this, Simulador);

      var _this = _possibleConstructorReturn(this, (Simulador.__proto__ || Object.getPrototypeOf(Simulador)).call(this, props));

      _this.defaultJson = function () {
        return _this.props.defaultJson ? _this.props.defaultJson : '{\n  "idCliente":"12345",\n  "idFaturamento":"123",\n  "parentUrl":"http://localhost.com",\n  "canal":"algar"\n}';
      };

      _this.cryptData = function (event) {
        event.preventDefault();
        var endereco = _this.endereco.value ? _this.endereco.value : '';
        var srv = _this.props.serverAddress + _this.props.uri;
        console.log(srv);
        var config = {
          mode: 'cors',
          method: "POST",
          'Content-Type': 'application/json;charset=utf-8;',
          body: _this.jsonData.value
        };

        fetch('' + srv, config).then(function (response) {
          return response.json().then(function (data) {
            if (data) {
              window.location.href = endereco + data.url;
            }
          });
        }).catch(function (error) {
          _this.setState({ failed: true });
          console.log(error.message);
          throw error;
        });
      };

      _this.state = {
        failed: false
      };
      return _this;
    }

    _createClass(Simulador, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _reactBootstrap.Form,
            { horizontal: true, onSubmit: this.props.handleSubmit ? this.props.handleSubmit : function (e) {
                return _this2.cryptData(e);
              } },
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 12 },
              _react2.default.createElement(
                'h4',
                null,
                'Insira os dados para criptografar:'
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 12 },
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xs: 12, sm: 6 },
                _react2.default.createElement(
                  _reactBootstrap.FormGroup,
                  null,
                  _react2.default.createElement(
                    _reactBootstrap.ControlLabel,
                    null,
                    'json Data'
                  ),
                  _react2.default.createElement(_reactBootstrap.FormControl, {
                    componentClass: 'textarea',
                    defaultValue: this.defaultJson(),
                    inputRef: function inputRef(ref) {
                      _this2.jsonData = ref;
                    },
                    style: { height: 200 }
                  })
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 12 },
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xs: 12, sm: 6 },
                _react2.default.createElement(
                  _reactBootstrap.FormGroup,
                  null,
                  _react2.default.createElement(
                    _reactBootstrap.ControlLabel,
                    null,
                    'Endere\xE7o App, n\xE3o informando envia para o pr\xF3prio'
                  ),
                  _react2.default.createElement(_reactBootstrap.FormControl, {
                    type: 'text',
                    defaultValue: this.props.endereco ? this.props.endereco : null,
                    placeholder: 'http://localhost:3000',
                    inputRef: function inputRef(ref) {
                      _this2.endereco = ref;
                    }
                  })
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 12 },
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xs: 12, sm: 12 },
                _react2.default.createElement(
                  _reactBootstrap.FormGroup,
                  null,
                  _react2.default.createElement(
                    _reactBootstrap.Button,
                    {
                      type: 'submit',
                      bsStyle: this.state.failed ? "danger" : "primary",
                      bsSize: 'sm'
                    },
                    this.state.failed ? "Retentar" : "Enviar"
                  )
                )
              )
            )
          )
        );
      }
    }]);

    return Simulador;
  }(_react2.default.Component);

  Simulador.defaultProps = {
    serverAddress: '' + process.env.REACT_APP_CRYPT_URL_PREFIX + process.env.REACT_APP_CRYPT_URL_SUFFIX,
    uri: "/cypher/encrypt"
  };

  Simulador.propTypes = {
    endereco: _react2.default.PropTypes.string,
    defaultJson: _react2.default.PropTypes.object,
    serverAddress: _react2.default.PropTypes.string.isRequired,
    uri: _react2.default.PropTypes.string.isRequired,
    handleSubmit: _react2.default.PropTypes.function
  };
  exports.default = Simulador;
});