import { MainProvider } from "./app/providers";
import NavBar from "./app/components/navbar";
import "./app/stylesheets/application.scss";
import RoutesMain from './app/routes';

const App = () => (
  <div id="main-page">
    <NavBar />
    <MainProvider >
      <RoutesMain />
    </MainProvider>
    
  </div>
);
export default App;
