import { useContext } from "react";
import ProviderContext from "../../providers";

export const QuestionBookThanks = () => {
  const { questions, dadosAtual } = useContext(ProviderContext);

  return (
    <div className="question-books">
      <div className="container-form">
        <header className="header">
          <h2>Obrigado por enviar!</h2>
        </header>
        {questions.length > 0 ? (
          questions.map((item, index) => (
            console.log(dadosAtual),
            <div key={index} className="content">
              <h3>{item.title}</h3>
              <br />
              <span>{item.body}</span>
              <br />
              <p>Resposta</p>
              <br />
              <p>{dadosAtual[index]}</p>
              <br />
              <hr />
            </div>
          ))
        ) : (
          <h2>Carregando...</h2>
        )}


     
      </div>
    </div>
  );
};
