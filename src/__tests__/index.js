import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Simulador from '../index';
import {FormControl, Button} from 'react-bootstrap';

// Shallow Rendering
// https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
describe('Shallow Rendering', () => {

    it('to have two FormControl', () => {
        const wrapper = shallow(<Simulador />);
        expect(wrapper.find('FormControl')).to.have.length(2);
    });

    it('to have one Button', () => {
        const wrapper = shallow(<Simulador />);
        expect(wrapper.find('Button')).to.have.length(1);
    });

    it('to have one textarea', () => {
        const wrapper = shallow(<Simulador />);
        expect(wrapper.find('FormControl').filter({componentClass: 'textarea'})).to.have.length(1);
    });

    // it('simulates click events', () => {
    //   const onSubmit = sinon.spy();
    //   const wrapper = shallow(<Simulador handleSubmit={onSubmit} />);
    //   wrapper.find('Form').simulate('submit');
    //   expect(onSubmit.calledOnce).to.equal(true);
    // });

});
