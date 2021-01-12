import React from 'react';
import LoginComponent from '../components/loginPage';
import {
    shallow
} from "enzyme";

describe('Test suite for loginComponent', () => {
    let login;
    beforeEach(() => {
        login = shallow(<LoginComponent />);
    })
    test('1. Test case for login method', () => {

        const FakeFun = jest.spyOn(LoginComponent.prototype, 'login');
        expect(login.find('h2').text()).toBe('Login Form');
        const loginButton = login.find('button');
        expect(loginButton.text()).toBe('Login');
        const loginForm = login.find('form');

        loginForm.simulate('submit');
        expect(FakeFun).toHaveBeenCalled();
    })
})