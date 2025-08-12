// src/components/Home.js
import React from 'react';

function Home() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <h2>Welcome, {user?.fname} {user?.lname}</h2>
            <p>This is your Todo List page.</p>
            {/* هنا ممكن تضيفي مكونات التودو ليست لاحقًا */}
        </div>
    );
}

export default Home;
