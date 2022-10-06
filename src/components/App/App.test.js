import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Testing render components', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/to-do list/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Render component', () => {
    const { getByRole, getByText, queryByRole } = render(<App />);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByText(/Add to-do/i)).toBeInTheDocument();
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(queryByRole('list')).not.toBeInTheDocument();
  });
});

describe('Testing user event, added some todos', () => {
  test('Click button, with empty imputs', () => {
    const { getByText, queryByRole } = render(<App />);
    const btn = getByText(/Add to-do/i);
    fireEvent.click(btn);
    expect(localStorage.getItem('userTodos')).toBe(null);
    expect(queryByRole('list')).not.toBeInTheDocument();
  });

  test('Click button, with inputs some text', () => {
    const { getByText, getByPlaceholderText, getByRole, getAllByRole } = render(<App />);
    const inpt = getByPlaceholderText(/enter your to-do/i);
    const btn = getByText(/Add to-do/i);
    fireEvent.change(inpt, {
      target: { value: 'test' },
    });
    fireEvent.click(btn);
    expect(getByRole('listitem')).toHaveTextContent('test');
    expect(localStorage.getItem('userTodos')).toEqual('[{\"name\":\"test\",\"checked\":false}]');
    fireEvent.change(inpt, {
      target: { value: 'test2' },
    });
    fireEvent.click(btn);
    expect(localStorage.getItem('userTodos')).toEqual('[{\"name\":\"test\",\"checked\":false},{\"name\":\"test2\",\"checked\":false}]');
  });

  test('Checked todo', () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole('checkbox')[1]);
    expect(localStorage.getItem('userTodos')).toEqual('[{\"name\":\"test\",\"checked\":false},{\"name\":\"test2\",\"checked\":true}]');
    fireEvent.dblClick(screen.getAllByRole('checkbox')[0]);
    expect(localStorage.getItem('userTodos')).toEqual('[{\"name\":\"test\",\"checked\":false},{\"name\":\"test2\",\"checked\":true}]');
  });
});

describe('Testing user event, delete todos', () => {
  test('Click delete button', () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole('button')[2]);
    expect(localStorage.getItem('userTodos')).toEqual('[{\"name\":\"test\",\"checked\":false}]');
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(localStorage.getItem('userTodos')).toEqual(null);
  });
});
