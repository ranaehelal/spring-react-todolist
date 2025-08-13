import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBar.css'

function Sidebar({ user, usedFilter, setNewFilter }) {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="logo" >
                <p>Welcome, {user.fname + ' ' + user.lname}</p>
            </div>

            <div className="sidebar-all_items">
                <div
                    className={`sidebar-item ${usedFilter === 'all' ? 'current' : ''}`}
                    onClick={() => setNewFilter('all')}
                    // set re render the oage
                >
                    <span>All Tasks</span>
                </div>

                <div
                    className={`sidebar-item ${usedFilter === 'important' ? 'current' : ''}`}
                    onClick={() => setNewFilter('important')}
                >
                    <span>Important</span>
                </div>

                <div
                    className={`sidebar-item ${usedFilter === 'work' ? 'current' : ''}`}
                    onClick={() => setNewFilter('work')}
                >
                    <span>Work</span>
                </div>

                <div
                    className={`sidebar-item ${usedFilter === 'personal' ? 'current' : ''}`}
                    onClick={() => setNewFilter('personal')}
                >
                    <span>Personal</span>
                </div>
            </div>

            <button
                className="logout-button"
                onClick={() => {
                    localStorage.removeItem('user');
                    navigate('/login');
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default Sidebar;
