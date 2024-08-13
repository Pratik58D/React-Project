import React, { useEffect, useRef, useState } from "react";

const DataTable = () => {
  const [formdata, setFormdata] = useState({ name: "", gender: "", age: "" });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const outsideClick = useRef(false);

  const filterData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!editId) return;
    let selectedItem = document.querySelectorAll(`[id='${editId}']`);
    selectedItem[0].focus();
  }, [editId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        outsideClick.current &&
        !outsideClick.current.contains(event.target)
      ) {
        setEditId(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  //  console.log(formdata)

  const handleOnclick = () => {
    if (formdata.name && formdata.gender && formdata.age) {
      const newItem = {
        id: Date.now(),
        name: formdata.name,
        gender: formdata.gender,
        age: formdata.age,
      };
      setData([...data, newItem]);
      setFormdata({ name: "", gender: "", age: "" });
    }
  };
  // console.log(data)

  const handleDelete = (id) => {
    const updatedlist = data.filter((item) => item.id !== id);
    setData(updatedlist);
  };

  const handleEdit = (id, updateData) => {
    if (!editId || editId !== id) {
      return;
    }
    const updatedList = data.map((item) =>
      item.id === id ? { ...item, ...updateData } : item
    );
    setData(updatedList);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
          <div className="form-item">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={formdata.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-item">
            <label htmlFor="">Gender</label>
            <input
              type="text"
              placeholder="Gender"
              name="gender"
              value={formdata.gender}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-item">
            <label htmlFor="">Age</label>
            <input
              name="age"
              type="text"
              placeholder="enter the age"
              value={formdata.age}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button className="add" onClick={handleOnclick}>
          ADD
        </button>
      </div>
      <div className="search-table-container">
        <label htmlFor="">Search by Name</label>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="search input"
        />

        <table ref={outsideClick}>
          <thead>
            <tr>
              <th>Name:</th>
              <th>Gender:</th>
              <th>Age:</th>
              <th>Action:</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((item) => (
              <tr key={item.id}>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { name: e.target.innerText })
                  }
                >
                  {item.name}
                </td>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { gender: e.target.innerText })
                  }
                >
                  {item.gender}
                </td>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { age: e.target.innerText })
                  }
                >
                  {item.age}
                </td>
                <td className="actions">
                  <button className="edit" onClick={() => setEditId(item.id)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination"></div>
      </div>
    </div>
  );
};

export default DataTable;
