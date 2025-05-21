import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Navbar, Hero, About, Experience, Tech, Works, Feedbacks, Contact, StarsCanvas } from './components';

const App = () => {
   return (
      <BrowserRouter basename="3D_PortfolioTemplate">
         <div className="relative z-0 bg-primary">
            <Routes>
               <Route
                  path="/"
                  element={
                     <>
                        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                           <Navbar />
                           <Hero />
                        </div>
                        <About />
                        <Experience />
                        <Tech />
                        <Works />
                        <Feedbacks />
                        <div className="relative z-0">
                           <Contact />
                           <StarsCanvas />
                        </div>
                     </>
                  }
               />
               <Route path="*" element={<Navigate to="/" />} />
            </Routes>
         </div>
      </BrowserRouter>
   );
};

export default App;
