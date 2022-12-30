import './App.styles.scss';
import './ant-styles.overrides.scss';
import { ToastContainer } from "react-toastify";
import Header from "../header/Header.component";
import { Outlet } from "react-router-dom";
import StreetcodeContent from '@/components/StreetcodeComponent/Streetcode.component';

const App = () => (
    <>
        <ToastContainer position='bottom-right'/>
        {
            <>
                <Header />
                <Outlet />
                <StreetcodeContent/>
            </>
        }
    </>
);

export default App;