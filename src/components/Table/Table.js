import React from "react";
import './Table.scss'
import TableElement from "../TableElement/TableElement";

export default function Table({ currentUsers, onSort }) {
    
    return (
        <div className='Table-wrapper'>
            <table className="Table">
                <thead>
                    <tr>
                        <th>
                            Дата
                        </th>
                        <th className="Table__th_hover" onClick={() => onSort('name')}>
                            Название
                        </th>
                        <th className="Table__th_hover" onClick={() => onSort('count')}>
                            Количество
                        </th>
                        <th className="Table__th_hover" onClick={() => onSort('distance')}>
                            Расстояние
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentUsers.map(user =>
                            <TableElement key={user.id} {...user} />)
                    }
                </tbody>

            </table>
        </div>
    )

}