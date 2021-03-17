import React from 'react'
import { mount,shallow } from 'enzyme'
import { expect } from 'chai'
import LayOut from '../layout/index.js'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
//layOut test
describe("layOut test",function(){
	it("click usermenu pop up menu",function(){
		let layOut=mount(<LayOut />);
		let menuStyle=layOut.find('.MuiMenu-paper').get(0).style;
		layOut.find('button').at(0).simulate('click');
		expect(menuStyle).to.have.property('opacity', '1');
	});
	it("click ADD turn into red",function(){
		let layOut=mount(<LayOut />);
		let menuStyle=layOut.find('.add').get(0).style;
		layOut.find('add').at(0).simulate('click');
		expect(menuStyle).to.have.property('color', 'red');
	});
});