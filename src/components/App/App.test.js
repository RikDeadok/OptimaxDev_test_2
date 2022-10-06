import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Testing render components', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/to-do list/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Render component', () => {
    const { getByRole, getByText, queryByRole } = render(<App />);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByText(/Add to-do/i)).toBeInTheDocument();
    expect(queryByRole('list')).not.toBeInTheDocument();
  });
});

describe('Testing user event', () => {

  beforeAll(() => {
    localStorage.clear();
  });

  test('Click button, with inputs some text', () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<App />);
    screen.debug();
    const inpt = getByPlaceholderText(/enter your to-do/i);
    const btn = getByText(/Add to-do/i);
    fireEvent.change(inpt, {
      target: { value: 'test' },
    });
    screen.debug();
    fireEvent.click(btn);
    screen.debug();
    expect(getByRole('listitem')).toHaveTextContent('test');
    expect(localStorage.getItem('userTodos')).toEqual('[{\"name\":\"test\",\"checked\":false}]');
  });
});

//Написать тест на удаление тудушки и проверки локал стораджа