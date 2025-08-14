import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './reg.css';
import Sidebar from './home-components/Sidebar';
import './home-components/Form.css';
import './home-components/ProgressBar.css'

function Home() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user')); // convert the str into json
    const userId = user?.userId;

    const [todos, setTodos] = useState([]);

    //todoo form has :
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [label, setLabel] = useState('');
    const [date, setDate] = useState('');

    //another todooo id for edit
    // when null (deafult)
    //no edit
    const [editTodoId, setEditTodoId] = useState(null);



    // check for clicked
    //why ?
    // to prevent multi click
    const [clicked, setClicked] = useState(false);


    // all , important , work , personal
    const [taskLabel, setTaskLabel] = useState('all');



    //Hook
    //when i go to home it check for the user id
    //and get the todos
    useEffect(() => {
        if (!userId ) {
            return;
        }
        getALLTodos();
    }, [userId]);

    //get all todos but after operations

    const getALLTodos = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/todos/user/${userId}`);
            if (!res.ok) throw new Error('Cant get todos');

            //conv to json and put it in the todos (state)
            const data = await res.json();
            setTodos(data);
        } catch (err) {
            console.error(err);
        }
    };

    const addNewTodo = async (e) => {
        // no reload event from the form
        e.preventDefault();
        if (!title.trim()) return;

        //start show clicked

        setClicked(true);
        try {
            const res = await fetch(`http://localhost:8080/api/todos/user/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, label ,date}),
            });
            if (!res.ok) throw new Error('Fail add ');

            setTitle('');
            setDescription('');
            setLabel('');
            setDate('');
            getALLTodos();
        } catch (err) {
            console.error(err);
        } finally {
            setClicked(false);
        }
    };

    const toggleComplete = async (todoId) => {
        try {
            const res = await fetch(`http://localhost:8080/api/todos/${todoId}/toggle`, {
                method: 'PUT',
            });
            if (!res.ok) throw new Error('Fail toggle ');
            getALLTodos();
        } catch (err) {
            console.error(err);
        }
    };

    const markAllCompleted = async () => {
        try {
            const notCompleted = todos.filter((todo) => !todo.complete);
            for (const todo of notCompleted) {
                const res = await fetch(`http://localhost:8080/api/todos/${todo.todoId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },

                    //Same toooodo just change the state
                    body: JSON.stringify({ ...todo, complete: true }),
                });
                if (!res.ok) throw new Error('Fail mark all completed');
            }
            getALLTodos();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteCompleted = async () => {
        try {
            const completed = todos.filter((todo) => todo.complete);
            for (const todo of completed) {
                const res = await fetch(`http://localhost:8080/api/todos/${todo.todoId}`, {
                    method: 'DELETE',
                });
                if (!res.ok) throw new Error('Fail delete completed ');
            }
            getALLTodos();
        } catch (err) {
            console.error(err);
        }
    };

    const DeleteTodo = async (todoId) => {
        try {
            const res = await fetch(`http://localhost:8080/api/todos/${todoId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete todo');
            getALLTodos();
        } catch (err) {
            console.error(err);
        }
    };

    const editGetOld = (todo) => {
        //edit state
        setEditTodoId(todo.todoId);
        setTitle(todo.title);
        setDescription(todo.description || '');
        setLabel(todo.label || '');
        setDate(todo.date ? todo.date.split('T')[0] : '');
    };

    const editSubmit = async (evet) => {
        evet.preventDefault();
        if (!editTodoId) return;

        const todoWillBeUpdate = todos.find(todo => todo.todoId === editTodoId);

        try {
            const res = await fetch(`http://localhost:8080/api/todos/${editTodoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...todoWillBeUpdate,
                    title,
                    description,
                    label,
                    date
                })
            });

            if (!res.ok) throw new Error('Fail edit todo');

            // reset
            setEditTodoId(null);
            setTitle('');
            setDescription('');
            setLabel('');
            setDate('');
            getALLTodos();
        } catch (err) {
            console.error(err);
        }
    };


    if (!user) {
        return (
            <div className="home-container">
                <div className="error-message">
                    <h2>Error</h2>
                    <p>Please log in to view your tasks</p>
                    <button className="register-button" onClick={() => ( navigate('/login')
                        )}>
                        Go back to Login
                    </button>
                </div>
            </div>
        );
    }


   //change when set state
    const TodosBYFilter = () => {
        if (taskLabel === 'all') return todos;
        if (taskLabel === 'important') return todos.filter((todo) => todo.label === 'important');
        if (taskLabel === 'work') return todos.filter((todo) => todo.label === 'work');
        if (taskLabel === 'personal') return todos.filter((todo) => todo.label === 'personal');
        return todos;
    };

    const filteredTodos = TodosBYFilter();
    const completedCount = filteredTodos.filter((todo) => todo.complete).length;
    const progressPercent = filteredTodos.length === 0 ? 0 : (completedCount / filteredTodos.length) * 100;


    const headingsMap = {
        all: 'All Tasks',
        important: 'Important Tasks',
        work: 'Work Tasks',
        personal: 'Personal Tasks'
    };
    //change when set state

    const heading = headingsMap[taskLabel] || '';

    return (
        <div className="all-page">
            {/*    //change when set state*/}
            <Sidebar user={user} usedFilter={taskLabel} setNewFilter={setTaskLabel} />
            <div className="main-content">
                    <h2>{heading}</h2>

                    <form
                        className="add-task-form"
                        onSubmit={editTodoId ? editSubmit : addNewTodo}
                    >
                        {/*// when set state change title also (must)*/}

                        <input
                            className="title-ip"
                            type="text"
                            placeholder="Title"
                            value={title}

                            onChange={(evt) => setTitle(evt.target.value)}
                            required
                            disabled={clicked}
                        />
                        <input
                            className="desc-ip"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(evt) => setDescription(evt.target.value)}
                            disabled={clicked}
                        />
                        <div className="date-label">
                            <select
                                className="label"
                                value={label}
                                onChange={(evt) => setLabel(evt.target.value)}
                                disabled={clicked}
                            >
                                <option value="">Select label </option>
                                <option value="important">Important</option>
                                <option value="work">Work</option>
                                <option value="personal">Personal</option>
                            </select>
                            <input
                                className="date"
                                type="date"
                                value={date}
                                onChange={(evt) => setDate(evt.target.value)}
                                disabled={clicked}
                            />
                        </div>

                        <button type="submit" className="register-button" disabled={clicked}>
                            {clicked
                                ? (editTodoId ? 'Updating' : 'Adding')
                                : (editTodoId ? 'Update Task' : 'Add Task')}
                        </button>

                    </form>

                    <div className="all-progress">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <p className="progress-text">{Math.round(progressPercent)}% Completed</p>
                    </div>

                    <div className="action-buttons" >
                        <button onClick={markAllCompleted} className="register-button">
                            Mark All Completed
                        </button>
                        <button onClick={deleteCompleted} className="register-button delete-btn">
                            Delete Completed
                        </button>
                    </div>

                    <ul className="todo-list">
                        {filteredTodos.map((todo) => (
                            <li key={todo.todoId} className={`todo-item ${todo.complete ? 'completed' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={todo.complete}
                                    onChange={() => toggleComplete(todo.todoId)}
                                    className="todo-checkbox"
                                />
                                <div className="todo-details">
                                    <div className="todo-title">
                                        <strong>{todo.title}</strong>
                                    </div>
                                    {todo.description && <p className="todo-description">{todo.description}</p>}
                                    <small className="todo-date">{new Date(todo.date).toLocaleDateString()}</small>
                                </div>

                                <div className="todo-actions">
                                    <button onClick={() => editGetOld(todo)}>Edit</button>
                                    <button className="remove-btn" onClick={() => DeleteTodo(todo.todoId)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {filteredTodos.length === 0 && <p>"Catch every thought before it runs away. We've got the net."</p>}
                </div>

        </div>
    );
}

export default Home;
