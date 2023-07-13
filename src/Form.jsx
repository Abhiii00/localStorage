import React, { useEffect, useState } from "react";
import "./Form.css";

function Form() {
    const [form, setForm] = useState({});
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            setRecords(JSON.parse(storedData));
        }
    }, []);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = { ...form, id: new Date().getTime().toString() };
        const updatedRecords = [...records, newRecord];
        setRecords(updatedRecords);
        setForm({ username: "", email: "", phone: "", password: "" });
        localStorage.setItem("userData", JSON.stringify(updatedRecords));
    };

    const handleRemove = (id) => {
        const updatedRecords = records.filter((record) => record.id !== id);
        setRecords(updatedRecords);
        localStorage.setItem("userData", JSON.stringify(updatedRecords));
    };

    return (
        <>
            <div className="main">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">fullname </label>
                        <input type="text"
                            autoComplete="off"
                            value={form.username}
                            onChange={handleInput}
                            name="username"
                            id="username"
                        />
                    </div>
                    <div>
                        <label htmlFor="username">email </label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={form.email}
                            onChange={handleInput}
                            name="email"
                            id="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="username">phone </label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={form.phone}
                            onChange={handleInput}
                            name="phone"
                            id="phone"
                        />
                    </div>
                    <div>
                        <label htmlFor="username">password </label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={form.password}
                            onChange={handleInput}
                            name="password"
                            id="password"
                        />
                    </div>
                    <button>Submit</button>
                </form>
                <div>
                    {records.map((curEle) => (
                        <div key={curEle.id} className="record-container">
                            <p>{curEle.username}</p>
                            <p>{curEle.email}</p>
                            <p>{curEle.phone}</p>
                            <p>{curEle.password}</p>
                            <button onClick={() => handleRemove(curEle.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Form;
