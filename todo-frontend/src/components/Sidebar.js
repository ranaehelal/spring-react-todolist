import React from 'react';

function Sidebar({ user, activeFilter, setActiveFilter }) {
    return (
        <div className="sidebar">
            <div className="logo" style={{ marginBottom: 20 }}>
                <p>Welcome, {user.fname + ' ' + user.lname}</p>
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
    );
}

export default Sidebar;
