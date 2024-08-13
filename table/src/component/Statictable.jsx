import React from 'react'
import "./statictable.css"

const Statictable = () => {
    const data =[
        {id:1, name: "pratik devkota",age:23},
        {id:2, name: "prakash shahi",age:22},
        {id:3, name: "Aayush skp",age:24},
        {id:4, name: "Naren Magar",age:24},
    ]
  return (
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
            </tr>
        </thead>
      <tbody>
        {data.map((row)=>(
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.age}</td>
            </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Statictable

