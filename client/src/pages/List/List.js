import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

function List() {
    let history = useHistory();

    const [operations, setOperations] = useState(null)

    const list = async () => {
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/list`)
                .then(response => response.json())
                .then(data => {
                    setOperations(data.data)
                })

        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        list()
    }, [])

    
    const onModify = (e) => {
        history.push({
            pathname: '/update',
            state: {
                data: e
            }
        })
    }

    const onDelete = async (e) => {
        console.log(e)
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/delete?id=${e}`
            );
        } catch (e) {
            console.log(e);
        }
        alert('Operation deleted successfully')
        window.location.reload();
    }

    const renderOperation = () => (
        operations.map((e) => {
            return (
                <tbody key={e.id}>
                    <tr>
                        <th scope='row'>{e.id}</th>
                        <td>{e.concept}</td>
                        <td>{e.amount}</td>
                        <td>{e.type}</td>
                        <td>{e.date}</td>
                        <td><button className='btn btn-warning' onClick={() => onModify(e)}>Modify</button></td>
                        <td><button className='btn btn-danger' onClick={() => onDelete(e.id)}>Delete</button></td>
                    </tr>
                </tbody>
            )
        })
    )

    if (!operations) {
        return (
            <div>There is no list for the moment</div>
        )
    } else{
        return (
            <div className='container text-center'>
                <h1 style={{ margin: '30px 0px' }}>List of all operations</h1>
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Concept</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'>Type</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Modify</th>
                            </tr>
                        </thead>
                        {renderOperation()}
                    </table>
                </div>
            </div>
        )
    }

    }

export default List
