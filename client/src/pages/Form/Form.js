import React, { useState } from "react";
import "../Form/form.css";

function Form() {
    const types = [
        { key: 1, value: "Income" },
        { key: 2, value: "Outcome" },
    ];

    const [data, setData] = useState({
        concept: "",
        amount: 0,
        date: "",
        type: 1,
    });

    const onChange = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        let newData = data;
        newData = { ...newData, [name]: value };
        setData(newData);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!data.concept || !data.amount || !data.date) {
            alert("All fields are required");
        }
        let sendData = data;
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/addoperation`, {
                method: "POST",
                body: JSON.stringify(sendData),
                headers: {
                    "Content-type": "application/json",
                },
            });
        } catch (e) {
            console.log(e);
        }

        alert("New operation added");
        window.location.reload();
    };

    return (
        <div className="custom-container">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="concept">Concept</label>
                    <input
                        type="text"
                        className="form-control"
                        id="concept"
                        value={data.concept}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        value={data.amount}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={data.date}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                        className="form-control"
                        id="type"
                        value={data.type}
                        onChange={onChange}
                    >
                        {types.map((item) => (
                            <option key={item.key} value={item.value}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-primary" onClick={onSubmit}>
                        Submit
          </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
