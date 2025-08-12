import React, { useEffect, useState } from 'react';
import './reg.css';

function Home() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.userId;

    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [label, setLabel] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [error, setError] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);


    useEffect(() => {
        if (!userId || userId === 'undefined' || isNaN(userId)) {
            setError('Please log in again');
            return;
        }
        setError('');
        getALLTodos();
    }, [userId]);

    const getALLTodos = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/todos/user/${userId}`);
            if (!res.ok) throw new Error('Cant to get todos');
            const data = await res.json();
            setTodos(data);
        } catch (err) {
            console.error(err);
            setError('Failed to load todos');
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/api/todos/user/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, label }),
            });
            if (!res.ok) throw new Error('Fail add todo');

            setTitle('');
            setDescription('');
            setLabel('');
            getALLTodos();
        } catch (err) {
            console.error(err);
            setError('Failo add todo');
        } finally {
            setLoading(false);
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
            setError('Failed toggle ');
        }
    };

    const markAllCompleted = async () => {
        try {
            const notCompleted = todos.filter((todo) => !todo.complete);
            for (const todo of notCompleted) {
                const res = await fetch(`http://localhost:8080/api/todos/${todo.todoId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...todo, complete: true }),
                });
                if (!res.ok) throw new Error('Fail mark all completed');
            }
            getALLTodos();
        } catch (err) {
            console.error(err);
            setError('Fail ark all completed');
        }
    };

    const deleteCompleted = async () => {
        try {
            const completed = todos.filter((t) => t.complete);
            for (const todo of completed) {
                const res = await fetch(`http://localhost:8080/api/todos/${todo.todoId}`, {
                    method: 'DELETE',
                });
                if (!res.ok) throw new Error('Failed to delete completed todos');
            }
            getALLTodos();
        } catch (err) {
            console.error(err);
            setError('Failed : delete completed todos');
        }
    };
    const handleDelete = async (todoId) => {
        try {
            const res = await fetch(`http://localhost:8080/api/todos/${todoId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete todo');
            // Refresh todos after deletion
            getALLTodos();
        } catch (err) {
            console.error(err);
            setError('Failed to delete todo');
        }
    };




    const handleEdit = (todoId) => {
        const todoToEdit = todos.find((t) => t.todoId === todoId);
        if (todoToEdit) {
            setEditTodoId(todoId);
            setTitle(todoToEdit.title);
            setDescription(todoToEdit.description);
            setLabel(todoToEdit.label);
        }
    };



    if (!user) {
        return (
            <div className="home-container">
                <div className="error-message">
                    <h2>Error</h2>
                    <p>Please log in to view your tasks</p>
                    <button className="register-button" onClick={() => (window.location.href = '/login')}>
                        Go back to Login
                    </button>
                </div>
            </div>
        );
    }

    const getFilteredTodos = () => {
        if (activeFilter === 'all') return todos;
        if (activeFilter === 'important') return todos.filter((t) => t.label === 'important');
        if (activeFilter === 'work') return todos.filter((t) => t.label === 'work');
        if (activeFilter === 'personal') return todos.filter((t) => t.label === 'personal');
        return todos;
    };

    const filteredTodos = getFilteredTodos();
    const completedCount = filteredTodos.filter((t) => t.complete).length;
    const progressPercent = filteredTodos.length === 0 ? 0 : (completedCount / filteredTodos.length) * 100;


    let heading = '';
    if (activeFilter === 'all') {
        heading = 'All Tasks';
    } else if (activeFilter === 'important') {
        heading = 'Important Tasks';
    } else if (activeFilter === 'work') {
        heading = 'Work Tasks';
    } else if (activeFilter === 'personal') {
        heading = 'Personal Tasks';
    }



    return (
        <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
            <div className="sidebar" >
                <div className="logo" style={{ marginBottom: 20 }}>
                    <p>Welcome, {user.fname + ' ' + user.lname }</p>
                </div>

                <div className="sidebar-menu">
                    <div
                        className={`menu-item ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                        style={{ cursor: 'pointer', marginBottom: 10 }}
                    >
                        <span>All Tasks</span>
                    </div>

                    <div
                        className={`menu-item ${activeFilter === 'important' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('important')}
                        style={{ cursor: 'pointer', marginBottom: 10 }}
                    >
                        <span>Important</span>
                    </div>

                    <div
                        className={`menu-item ${activeFilter === 'work' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('work')}
                        style={{ cursor: 'pointer', marginBottom: 10 }}
                    >
                        <span>Work</span>
                    </div>

                    <div
                        className={`menu-item ${activeFilter === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('personal')}
                        style={{ cursor: 'pointer', marginBottom: 10 }}
                    >
                        <span>Personal</span>
                    </div>
                </div>

                <button
                    className="logout-button"
                    onClick={() => {
                        localStorage.removeItem('user');
                        window.location.href = '/login';
                    }}
                >
                    Logout
                </button>

            </div>
            {/*----------------------------------------------------------------*/}
            <div className="main-content" style={{ flexGrow: 1, padding: 20 }}>
                <div className="home-container">
                    <h2>{heading}</h2>


                    <form className="add-task-form" onSubmit={handleAddTodo} style={{ marginBottom: 20 }}>
                        <input
                            className="register-input"
                            type="text"
                            placeholder="Add new task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            disabled={loading}
                            style={{ marginBottom: 10 }}
                        />
                        <input
                            className="register-input"
                            type="text"
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={loading}
                            style={{ marginBottom: 10 }}
                        />
                        <select
                            className="register-input"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            disabled={loading}
                            style={{ marginBottom: 10 }}
                        >
                            <option value="">Select label (optional)</option>
                            <option value="important">Important</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                        </select>

                        <button type="submit" className="register-button" disabled={loading}>
                            {loading ? 'Adding the task ' : 'Add Task'}
                        </button>
                    </form>
                    <div className="all-progress">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <p className="progress-text">{Math.round(progressPercent) }% Completed</p>
                    </div>

                    <div className="action-buttons" style={{ marginBottom: 20 }}>
                        <button onClick={markAllCompleted} className="register-button">
                            Mark All Completed
                        </button>
                        <button onClick={deleteCompleted} className="register-button delete-btn">
                            Delete Completed
                        </button>
                    </div>

                    <ul className="todo-list">
                        {filteredTodos.map((todo) => (
                            <li
                                key={todo.todoId}
                                className={`todo-item ${todo.complete ? 'completed' : ''}`}
                            >
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
                                    {todo.description && (
                                        <p className="todo-description">{todo.description}</p>
                                    )}
                                    <small className="todo-date">
                                        {new Date(todo.date).toLocaleDateString()}
                                    </small>
                                </div>

                                <div className="todo-actions">
                                    <button onClick={() => handleEdit(todo.todoId)}>Edit</button>
                                    <button className="remove-btn" onClick={() => handleDelete(todo.todoId)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>



                    {filteredTodos.length === 0 && <p>"Catch every thought before it runs away. We've got the net."</p>}
                </div>
            </div>
        </div>
    );
}

export default Home;
