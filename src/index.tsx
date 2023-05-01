import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CarpetReceptionsPage from './Component/carpetReceptionPage/CarpetReceptionsPage';
import DeliveryPage from './Component/DeliveryPage/DeliveryPage';
import DownloadList from './Component/DownloadListPage/DownloadList';
import Login from './Component/LogInPage/Login';
import MeasuringAndPreparingCarpet from './Component/MeasuringAndPreparing/MeasuringAndPreparingCarpet';
import Scheduling from './Component/SchedulingPage/Scheduling';
import WorkerSingUp from './Component/WorkerSingUpPage/WorkerSingUp';
import User from './Context/UserContext';
import Worker from './Context/WorkerContext';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { setupStore } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={setupStore(undefined)}>
      <User>
        <Worker>
          <Routes>
            <Route path="/" element={<Login workerLogIn={false} />} />
              <Route path="/workerlogin" element={<Login workerLogIn={true} />} />
            <Route path="/workersingup" element={<WorkerSingUp />} />
            <Route path="/reception" element={<CarpetReceptionsPage />} />
            <Route
              path="/measuringandpreparingcarpet"
              element={<MeasuringAndPreparingCarpet />}
            />
            <Route path="/deliverylist" element={<DeliveryPage />} />
            <Route
              path="/schedulingcarpetretrivals"
              element={<Scheduling />}
            />
            <Route path="/downloadlist" element={<DownloadList />} />
          </Routes>
        </Worker>
      </User>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
