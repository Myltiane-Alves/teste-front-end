import React from "react";
import { Routes, Route } from 'react-router-dom';

import { QuestionBooks, QuestionBookShow, QuestionBookThanks } from "../screens/QuestionBooks";
import NotFound from "../screens/Notfound";

const RoutesMain = () => {
  return (
    <Routes>
    <Route path="/" element={<QuestionBooks />} />
    <Route path="/cadernos-de-questoes" element={<QuestionBookShow />} />
    <Route path="/cadernos-de-questoes/:id" element={<QuestionBookShow />} />
    <Route path="/cadernos-de-questoes/:id/obrigado" element={<QuestionBookThanks />} />
    <Route path="/404" element={<NotFound />} />
    
  </Routes>
  );
}
export default RoutesMain;


