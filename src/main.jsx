import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './components/context/userContext.jsx';
import Preloader from './ui/Preloader/Preloader.jsx'; // Import Preloader component
import 'aos/dist/aos.css';

createRoot(document.getElementById('root')).render(
    <div className="bg-white w-screen h-screen">
        <UserProvider>
           <Preloader>
                <App />
            </Preloader>
        </UserProvider>
    </div>
);
