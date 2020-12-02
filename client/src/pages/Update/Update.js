import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function Update(props) {

    let history = useHistory();
    const { data } = props.location.state;

    const [newData, setNewData] = useState({
        concept: data.concept,
        amount: data.amount,
        date: data.date,
    });

    const onChange = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        let changedData = data;
        changedData = { ...changedData, [name]: value };
        setNewData(changedData);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!newData.concept || !newData.amount || !newData.date) {
            alert("All fields are required");
        }
        let sendData = newData;
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/update`, {
                method: "PUT",
                body: JSON.stringify(sendData),
                headers: {
                    "Content-type": "application/json",
                },
            });
        } catch (e) {
            console.log(e);
        }
        
        alert("New operation updated");
        history.push("/list")
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
                        value={newData.concept}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        value={newData.amount}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={newData.date}
                        onChange={onChange}
                    />
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-primary" onClick={onSubmit}>
                        Submit
            </button>
                </div>
            </form>
        </div>
    )
}

export default Update