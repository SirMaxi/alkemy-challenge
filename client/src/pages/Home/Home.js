import React, { useEffect, useState } from 'react'
import "./home.css";

function Home() {
    const [operations, setOperations] = useState(null);
    const [result, setResult] = useState(0);

    const list = async () => {
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/list`)
                .then((response) => response.json())
                .then((data) => {
                    const array = data.data.reverse();
                    const newArray = array.slice(0,10)
                    setOperations(newArray);

                });
        } catch (e) {
            console.log(e);
        }
    };

    const getResult = async () => {
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/result`)
                .then((response) => response.json())
                .then((data) => {
                    setResult(data.data[0].amount);
                });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        list();
        getResult();
    }, []);

    if (!operations) {
        return <div>No hay listado por el momento</div>;
    }

    const renderOperation = () =>
    
        operations.map((e) => {
            return (
                <tbody key={e.id}>
                    <tr>
                        <th scope="row">{e.id}</th>
                        <td>{e.concept}</td>
                        <td>{e.amount}</td>
                        <td>{e.type}</td>
                        <td>{e.date}</td>
                    </tr>
                </tbody>
            );
        });

        const renderResult = () => {
            return(
                <div>${result}</div>
            )
        }

    return (
        <div>
            <div className="container">
                <h1 className="text-center title-home">My Incomes/Outcomes</h1>
                <div className="row">
                    <div className="col-sm" style={{margin: '20px 100px'}}>
                        <div className="card text-white bg-success text-center shadow">
                            <div className="card-body">
                                <h2>Total balance</h2>
                                <h3>{renderResult()}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <h2 className='text-center' style={{margin: '0px 0px 30px 0px'}}>Last 10 operations</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope='col'>Concept</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            {renderOperation()}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
