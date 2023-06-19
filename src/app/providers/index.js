import React, { createContext, useState, useEffect } from 'react';
import json from '../api/question_books.json';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const ProviderContext = createContext();

export const MainProvider = ({ children }) => {
    const { id } = useParams();
    const [getData, setGetData] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [showAnswered, setShowAnswered] = useState(false);
    const [answeredCards, setAnsweredCards] = useState([]);
    const [responseData, setResponseData] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerStudents, setAnswerStudents] = useState([]);
    const [dadosAtual, setDadosAtual] = useState([]);

    useEffect(() => {
        setQuestions(json);
        setGetData(json);

        const answered = json.filter((item) => item.answered === true).map((item) => item.id);
        setAnsweredCards(answered);

        const savedRespostas = localStorage.getItem(`question_books/${id}.json`);
        if (savedRespostas) {
            setAnswerStudents(JSON.parse(savedRespostas));
        }
        setDadosAtual(savedRespostas ? JSON.parse(savedRespostas) : []);
    }, [id]);

    function filterQuestions(e) {
        setShowAnswered(e.target.checked);

        let res = [];
        if (e.target.checked) {
            res = questions.filter((item) => item.answered === false);
            setGetData(res);
            setQuestions(res);
        } else {
            setGetData(json);
            setQuestions(json);
        }
    }

    const limitedTextarea = (e) => {
        const newCount = e.target.value;
        if (newCount.length) {
            setResponseData(newCount);
            setAnswerStudents((prevRespostas) => {
                const updatedRespostas = [...prevRespostas];
                updatedRespostas[currentQuestion] = newCount;
                return updatedRespostas;
            });
        }
    };

    const handleNextQuestion = async (e) => {
        e.preventDefault();
        const nextQuestion = currentQuestion + 1;
        nextQuestion < getData.length && setCurrentQuestion(nextQuestion);
        setResponseData('');
    };

    const handlePrevQuestion = async (e) => {
        e.preventDefault();
        const prevQuestion = currentQuestion - 1;
        prevQuestion >= 0 && setCurrentQuestion(prevQuestion);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAnswer = responseData;
        const updatedAnswerStudents = [...answerStudents, newAnswer];
        setAnswerStudents(updatedAnswerStudents);
        localStorage.setItem(`question_books/${id}.json`, JSON.stringify(updatedAnswerStudents));
        setResponseData('');
        toast.success('enviado com sucesso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const allAnswersSent = currentQuestion + 1 === getData.length;

    const contextValue = {
        getData,
        questions,
        dadosAtual,
        showAnswered,
        answeredCards,
        filterQuestions,
        responseData,
        currentQuestion,
        answerStudents,
        limitedTextarea,
        handleNextQuestion,
        handlePrevQuestion,
        handleSubmit,
        allAnswersSent
    };

    return (
        <ProviderContext.Provider value={contextValue}>
            {children}
        </ProviderContext.Provider>
    )
};

export default ProviderContext;