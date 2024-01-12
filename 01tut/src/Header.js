import React from 'react'

function Header({ title='New title page' }) {
  return (
    <header>
        <h1>{title}</h1>
    </header>
  )
}
//Header.defaultProps="New title page"
export default Header