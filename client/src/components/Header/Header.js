import React from 'react'

function Header() {
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Alkemy Challenge</a>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <a className="nav-link" href="/form">Trade Log</a>
                    </li>
                    <li>
                        <a className="nav-link" href="/list">List</a>
                    </li>
                </ul>
            </nav>
    )
}

export default Header
