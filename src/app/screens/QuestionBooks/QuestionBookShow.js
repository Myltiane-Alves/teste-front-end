import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useParams } from 'react-router-dom';
import ProviderContext from '../../providers';

export const QuestionBookShow = () => {
  const { id } = useParams();
  const {
    getData,
    responseData,
    currentQuestion,
    limitedTextarea,
    handleNextQuestion,
    handlePrevQuestion,
    handleSubmit,
    allAnswersSent,
    
  } = useContext(ProviderContext);

  const [countCaracteres, setCountCaracteres] = useState(0);

  useEffect(() => {
    setCountCaracteres(responseData.length);
  }, [responseData]);

  const currentData = getData && getData[currentQuestion] ? getData[currentQuestion] : {};
  const currentAnswer = currentData && currentData.answers ? currentData.answers[currentQuestion] : {};

  return (
    <div className="question-books">
      <div className="container-form">
        <div className="header-form">
          <div className="title">
            <p>{currentAnswer?.title} </p>
            <br />
            <span>{currentAnswer?.body} </span>
          </div>
        </div>
        <div className="content-form">
          <form onSubmit={handleSubmit}>
            <div className="fields">
              <textarea
                placeholder="Responda aqui"
                value={responseData}
                onChange={limitedTextarea} // Atualiza o valor de responseData ao digitar no textarea
              />
            </div>
            <div className="fields">
              <p> {'Total de caracteres: ' + countCaracteres}  </p>
            </div>
            <div className="container-btn">
              <button
                className="btn"
                type="submit"
                onClick={
                  currentQuestion + 1 === getData.length
                    ? handleSubmit
                    : handleNextQuestion
                }
              >
                Enviar Resposta
                {currentQuestion + 1 === getData.length}
              </button>

              {allAnswersSent && (
                <button type="submit" className="btn">
                  <a href={`/cadernos-de-questoes/${id}/obrigado`}>
                    Finalizar Prova
                  </a>
                </button>
              )}
            </div>
            <hr />
            <div className="container-btn">
              <button className="btn" onClick={handlePrevQuestion}>
                Pergunta anterior
              </button>
              <button className="btn" onClick={handleNextQuestion}>
                {currentQuestion + 1 === getData.length}
                Próxima pergunta
              </button>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
