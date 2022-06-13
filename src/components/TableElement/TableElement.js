import React from "react";

export default function TableElement({name, distance, count, date,}) {
    return (
        <tr >
            <td> {date} </td>
            <td> {name} </td>
            <td> {count} </td>
            <td> {distance} </td>
        </tr>

    )
};