import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';



export default function TodoScreen(props) {
    const [name, setName] = useState('');
    const [data, setData] = useState('');
    const [todo, setTodo] = useState('');
    const [percent, setPercent] = useState('');

    const history = useHistory()

    useEffect(() => {

        fetchHandler();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = document.cookie.split(';').find(x => x.trim().startsWith('token'));

    const token = value.split('=')[1];

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const backendUrl = process.env.REACT_APP_BACK_END_URL || "http://localhost:3002";

            await axios.post(
                `${backendUrl}/api/todos/mine`, { todo },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const input = document.querySelector('.todoinput');
            input.style.display = 'none';
            fetchHandler();
            console.log(props);

        } catch (err) {
            console.log(err);
        }
    };
    const EditHandler = async (id, updatedTodo) => {
        // e.preventDefault();
        let status = false;
        const done = document.querySelector(`#done${id} input[type="radio"]:checked`);
        if (done) {

            if (done.value === "done") {
                status = true;
            }
            console.log(done.value, status);
        }

        try {
            const backendUrl = process.env.REACT_APP_BACK_END_URL || "http://localhost:3002";

            await axios.put(
                `${backendUrl}/api/todos/mine/${id}`, { updatedTodo, status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchHandler();

            const content = document.querySelector(`.content${id}`);
            const butn = document.querySelector(`.button${id}`);
            content.style.display = "flex";
            butn.style.display = "inline";
            const updateinput = document.querySelector(`#update${id}`);
            updateinput.style.display = "none";


        } catch (err) {
            console.log(err);
        }
    };
    const DeleteHandler = async (id) => {
        try {
            const backendUrl = process.env.REACT_APP_BACK_END_URL;

            await axios.delete(
                `${backendUrl}/api/todos/mine/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchHandler();

        } catch (err) {
            console.log(err);
        }
    };



    const fetchHandler = async () => {
        // e.preventDefault();
        try {

            const backendUrl = process.env.REACT_APP_BACK_END_URL || "http://localhost:3002";

            const { data } = await axios.get(
                `${backendUrl}/api/todos/mine`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (data) {
                setName(data.name);
                const completed = data.todos.filter(value => value.status).length;
                const total = data.todos.length;
                const percentage = completed / total * 100;
                setPercent(percentage)
                const info = data.todos.map((value, index) => {
                    return (
                        <div key={index} className="todo">
                            <div className="drey">
                                <div className={`content${value._id}`}>
                                    <span className="checker"><i className={value.status ? "fa fa-check-circle" : "fa fa-circle-o"}></i></span>
                                    <span className={`content ${value._id}`}>{value.message}</span>
                                </div>
                                <div className="updateinput addbutton" id={`update${value._id}`}>
                                    <div>
                                        <input className={`input${value._id}`} type="text" placeholder={value.message} />
                                        <div className="status" id={`done${value._id}`}> Status:

                                            <input type="radio" name="status" value="done" />
                                            <label htmlFor="done">Done</label>
                                            <input type="radio" name="status" value="not done" />
                                            <label htmlFor="not done">Not Done</label>

                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            const input = document.querySelector(`.input${value._id}`).value;

                                            EditHandler(value._id, input);
                                        }}>Submit</button>
                                    </div>


                                </div>
                                <div><span className={`button${value._id}`}><button onClick={(e) => {
                                    e.preventDefault();
                                    const content = document.querySelector(`.content${value._id}`);
                                    const butn = document.querySelector(`.button${value._id}`);
                                    content.style.display = "none";
                                    butn.style.display = "none";
                                    const updateinput = document.querySelector(`#update${value._id}`);
                                    updateinput.style.display = "flex";
                                }}>Edit</button> </span><button onClick={(e) => {
                                    e.preventDefault();
                                    DeleteHandler(value._id);
                                }}>Delete</button></div>
                            </div>
                        </div>
                    );
                });
                setData(info);
            }
        } catch (err) {
            setData(null);
        }
    };

    const SignoutHandler = () => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        history.push("/")
    };


    return (

        <div>
            <div className="signout">
                <button onClick={SignoutHandler}>Signout</button>
            </div>
            <h1>Welcome {name},</h1>
            <div> Percentage completion: {percent}% </div>
            <form onSubmit={submitHandler}>
                <div className="todo">
                    <div className="addbutton">
                        <button onClick={(e) => {
                            e.preventDefault();
                            const input = document.querySelector('.todoinput');
                            input.style.display = 'flex';
                        }}>Add New Todo</button>
                    </div>

                    <div className="todoinput addbutton">
                        <input type="text" placeholder="Enter todo" onChange={(e) => setTodo(e.target.value)} />
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
            <form>{data}</form>

        </div >
    );
}
