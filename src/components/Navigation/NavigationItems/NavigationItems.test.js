import React from 'react';
import {navigationItems as NavigationItems} from './NavigationItems.js';
import NavigationItem from './NavigationItem/NavigationItem.js';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
configure({adapter:new Adapter()})


describe('<NavigationItems/>',function(){
    it('Navigation Items Should Have Three Navigation Item Components If We Are Not Authenticated',function(){
        const wrapper=shallow(<NavigationItems/>)
        //wrapper.setProps({})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
})