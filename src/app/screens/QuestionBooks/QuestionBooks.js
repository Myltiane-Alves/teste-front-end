import React, { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import ProviderContext from '../../providers';

export const QuestionBooks = () => {
  
  const {
    showAnswered,
    questions,
    filterQuestions,
    answeredCards,
  } = useContext(ProviderContext);

  return (
    <div className="question-books">
      <div className="header">
        <input
          className="check"
          type="checkbox"
          checked={showAnswered}
          value={questions.answered}
          onChange={filterQuestions}
        />
        <label>Mostrar apenas questões não respondidas</label>
      </div>

      <div className="cards">
        {questions.map((list, index) => {
          const isRespondido = answeredCards.includes(list.id);
          const cardClassName = isRespondido ? 'card card-respondido' : 'card';
          return (
            <div className="card" key={list.id}>
              <h3>{list.title}</h3>
              <span>{list.questionAmount} questões</span>
              <p>{isRespondido ? 'Respondido' : 'Não Respondido'}</p>
              <button type="button" className="btn" disabled={isRespondido}>
                <a href={`cadernos-de-questoes/${list.id}`}  className="btn">
                  Responder
                </a>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
