import React from 'react';
import {Form, Button, FormGroup, Col, ControlLabel, FormControl} from 'react-bootstrap';

class Simulador extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            failed: false
        }
    }

    defaultJson = () => {
        return this.props.defaultJson ? this.props.defaultJson :
        `{
            "idCliente":"12345",
            "idFaturamento":"123",
            "parentUrl":"http://localhost.com",
            "canal":"algar"
        }`;
    }

    cryptData = (event) => {
        const endereco = this.endereco.value ? this.endereco.value : '';
        let srv = this.props.serverAddress + this.props.uri;
        let config = {
            mode: 'cors',
            method: 'POST',
            'Content-Type': 'application/json;charset=utf-8;',
            body: this.jsonData.value
        }

        fetch(`${srv}`, config)
        .then(response => {
            return response.json().then(function(data) {
                if (data) {
                    window.location.href = endereco + data.url;
                }
            });
        })
        .catch(error => {
            this.setState({failed:true});
            console.log(error.message);
            throw error;
        });
    }

    render() {
        return (
            <div>
            <Form horizontal onSubmit={e => this.cryptData(e)}>
            <Col xs={12} sm={12}>
            <h4>Insira os dados para criptografar:</h4>
            </Col>

            <Col xs={12} sm={12}>
            <Col xs={12} sm={6}>
            <FormGroup>
            <ControlLabel>json Data</ControlLabel>
            <FormControl
            componentClass="textarea"
            defaultValue={this.defaultJson()}
            inputRef={
                ref => {
                    this.jsonData = ref;
                }
            }
            style={{height: 200}}
            />
            </FormGroup>
            </Col>
            </Col>

            <Col xs={12} sm={12}>
            <Col xs={12} sm={6}>
            <FormGroup>
            <ControlLabel>Endereço App, não informando envia para o próprio</ControlLabel>
            <FormControl
            type="text"
            defaultValue={this.props.endereco ? this.props.endereco : null }
            placeholder="http://localhost:3000"
            inputRef={
                ref => {
                    this.endereco = ref;
                }
            }
            />
            </FormGroup>
            </Col>
            </Col>

            <Col xs={12} sm={12}>
            <Col xs={12} sm={12}>
            <FormGroup>
            <Button
            type="submit"
            bsStyle={ this.state.failed ? 'danger' : 'primary' }
            bsSize="sm"
            >{ this.state.failed ? 'Retentar' : 'Enviar' }</Button>
            </FormGroup>
            </Col>
            </Col>
            </Form>
            </div>
        )
    }
}

Simulador.defaultProps = {
    serverAddress: `${process.env.REACT_APP_CRYPT_URL_PREFIX}${process.env.REACT_APP_CRYPT_URL_SUFFIX}`,
    uri: '/cypher/encrypt',
    defaultJson: `{
        "keyX":"12345",
        "keyY":"123"
    }`
}

Simulador.propTypes = {
    endereco: React.PropTypes.string,
    defaultJson: React.PropTypes.string,
    serverAddress: React.PropTypes.string.isRequired,
    uri: React.PropTypes.string.isRequired
}
export default Simulador;
