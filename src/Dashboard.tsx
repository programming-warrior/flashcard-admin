import { useEffect, useState } from "react";
import axios from "axios";
import FlashCard from "./component/FlashCard/FlashCard";
import CloseIcon from "./component/CloseIcon";
import { useNavigate } from "react-router-dom";


interface FlashCardType {
    id: string,
    question: string,
    answer: string,
}

const Dashboard = () => {
    const [flashCards, setFlashCards] = useState<FlashCardType[]>([]);
    const [modal, setModal] = useState(false);
    const [action, setAction] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [id, setId] = useState('');
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate=useNavigate();


    async function fetchData() {
        const res = await axios.get(`${BACKEND_URL}/api/fetch`)
        if (res.status === 200 || res.status === 201) {
            setFlashCards([...res.data]);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const method = action === 'ADD' ? 'POST' : 'PUT';
        const path = action === 'ADD' ? '/api/create' : `/api/update/${id}`;

        console.log(path);
        const token = localStorage.getItem('token');

        const res = await axios(`${BACKEND_URL}${path}`, {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                question,
                answer
            }
        });

        if (res.status === 200 || res.status === 201) {
            setModal(false);
            setQuestion("");
            setAnswer("");
            fetchData();
        }
    }

    async function handleDelete(id: string) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`${BACKEND_URL}/api/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.status === 200 || res.status === 201) {
            fetchData();
        }
    }

    async function handleLogOut(){
        const token=localStorage.getItem('token');
        
        try{
            const res=await axios.post(`${BACKEND_URL}/api/token/delete`,{
                token
            });
            if(res.status=== 200 || res.status===201){
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
        catch(e){
            console.log(e);
        }
    }


    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="bg-black min-h-screen relative">

            <div className={`${modal ? 'block' : 'hidden'} absolute rounded-lg bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] z-10          text-white top-52 left-1/2 -translate-x-1/2 min-w-72`}
            >
                <div className="flex justify-end cursor-pointer px-3 pt-1" onClick={() => {
                    setModal(false);
                    setQuestion("");
                    setAnswer("");
                }}>
                    <CloseIcon />
                </div>
                <form className="min-w-72 p-6 text-black" onSubmit={(e) => handleSubmit(e)}>
                    <div className="gap-3 flex items-center justify-between">
                        <label>Question</label>
                        <input className="py-1 px-2 border border-black outline-none" type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="gap-3  flex items-center justify-between  mt-3">
                        <label>Answer</label>
                        <input className="py-1 px-2 border border-black outline-none" type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-3 ">
                        <button type="submit" className="bg-[#081018] text-white  py-1 px-2 rounded-lg border-0">Submit</button>
                    </div>
                </form>
            </div>

            <nav className="w-full flex justify-end gap-4 p-6 ">

                <button style={{
                    boxShadow: 'inset 0px 2px 1px rgba(255, 255, 255, 0.2),inset 0px -2px 1px rgba(0, 0, 0, 0.2)',
                    filter: 'drop-shadow(0px 2px 6px rgba(14, 42, 87, 0.1)) drop-shadow(0px 1px 2px rgba(3, 16, 38, 0.26))'
                }}
                    className=" text-white  font-bold text-[12px] xl:text-sm bg-[#0077C2] tracking-wider px-3  xl:px-5  py-3 xl:py-4    rounded-xl "
                    onClick={() => {
                        setModal(true);
                        setAction("ADD");
                    }}
                >
                    Add Flashcard
                </button>

                <button style={{
                    boxShadow: 'inset 0px 2px 1px rgba(255, 255, 255, 0.2),inset 0px -2px 1px rgba(0, 0, 0, 0.2)',
                    filter: 'drop-shadow(0px 2px 6px rgba(14, 42, 87, 0.1)) drop-shadow(0px 1px 2px rgba(3, 16, 38, 0.26))'
                }}
                    className=" text-white  font-bold text-[12px] xl:text-sm bg-[#0077C2] tracking-wider px-3  xl:px-5  py-3 xl:py-4    rounded-xl "
                    onClick={() => {
                        handleLogOut();
                    }}
                >
                    Logout
                </button>

            </nav>

            <div className=" p-10 flex flex-wrap justify-center cursor-pointer gap-6">
                {
                    flashCards.map(e => {
                        return <FlashCard data={e} handleUpdate={() => {
                            setId(e.id);
                            setModal(true);
                            setQuestion(e.question);
                            setAnswer(e.answer)
                            setAction('UPDATE');
                        }}
                            handleDelete={() => {
                                handleDelete(e.id);
                            }}
                        />
                    })
                }
            </div>
        </div>

    )
}

export default Dashboard;