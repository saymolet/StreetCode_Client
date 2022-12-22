import './App.styles.css';
import { ToastContainer } from "react-toastify";
import { useAsync } from "app/common/hooks/stateful/useAsync.hook";
import FactsApi from "app/api/facts.api";
import Header from "../header/Header.component";
import { Outlet } from "react-router-dom";

const App = () => {
    const { getAll } = FactsApi;
    const { value: facts } = useAsync(getAll);

    console.log(facts);

    return (
        <>
            <ToastContainer position='bottom-right' />
            {
                <>
                    <Header />
                    <Outlet />
                </>
            }
        </>
    );
}

export default App;