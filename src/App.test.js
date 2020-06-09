import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {any} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state)
  return wrapper;
}
/**
 * Return node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper 
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

describe('render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without error', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
  });

  test('renders increment button', () => {
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
  });

  test('renders decrement button', () => {
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1);
  });

  test('renders counter display', () => {
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);
  });

  test('counter starts at 0', () => {
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0);
  });
});

describe('increment', () => {
  test('clicking increment button increments counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });
  
    // find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
  
    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);
  });
});

describe('decrement', () => {
  test('clicking decrement button decrements counter display when state is greater than 0', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });
  
    // find button and click
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    decrementButton.simulate('click');
  
    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);
  });

  describe('counter is 0 and decrement is clicked', () => {
    let wrapper;

    beforeEach(() => {
      // default values: {counter: 0, error: false} are good
      wrapper = setup();
      const decrementButton = findByTestAttr(wrapper, 'decrement-button');
      decrementButton.simulate('click');
      wrapper.update();
    });

    test('dont let counter go below 0', () => {  
      // find display and assert counter is still 0
      const counterDisplay = findByTestAttr(wrapper, 'counter-display');
      expect(counterDisplay.text()).toContain(0);
    
      // assert error state is true
      const counterDisplayErrorState = wrapper.state('error');
      expect(counterDisplayErrorState).toEqual(true);
    
      // assert error message displays
      const errorMessage = findByTestAttr(wrapper, 'counter-display-error');
      expect(errorMessage.length).toBe(1);
    });

    test('remove error when increment button is clicked', () => {
      //find and click the increment button
      const incrementButton = findByTestAttr(wrapper, 'increment-button');
      incrementButton.simulate('click');
    
      // find display and assert that counter increments
      const counterDisplay = findByTestAttr(wrapper, 'counter-display');
      expect(counterDisplay.text()).toContain(1);
    
      // assert error state is false
      const counterDisplayErrorState = wrapper.state('error');
      expect(counterDisplayErrorState).toEqual(false);

      // assert error message goes away
      const errorMessage = findByTestAttr(wrapper, 'counter-display-error');
      expect(errorMessage.length).toBe(0);
    });
  });
});









