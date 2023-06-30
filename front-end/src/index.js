import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux"

// import css index file 
import "./index.css";
import { store } from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

    <Provider store={store}>
        <App />
    </Provider>

)

