import React from "react";
import './Pagination.scss'

export default function Pagination({ currentPage, usersOnPage, totalUsers, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersOnPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className='Paginate'>
            {pageNumbers.map(number => <button className={ number === currentPage ? 'Paginate__button_active' : 'Paginate__button'}
                key={number} onClick={() => paginate(number)}> {number} </button>
            )}
        </div>

    )

}