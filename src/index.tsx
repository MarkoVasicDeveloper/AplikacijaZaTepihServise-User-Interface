import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CarpetReceptionsPage from './Component/carpetReceptionPage/CarpetReceptionsPage';
import DeliveryPage from './Component/DeliveryPage/DeliveryPage';
import DownloadList from './Component/DownloadListPage/DownloadList';
import MeasuringAndPreparingCarpet from './Component/MeasuringAndPreparing/MeasuringAndPreparingCarpet';
import Scheduling from './Component/SchedulingPage/Scheduling';
import LoginAndWorkerSingUp from './Component/LogInPageAndSingUp/LoginAndWorkerSingUp';

import './index.css';

import reportWebVitals from './reportWebVitals';

import { setupStore } from './redux/store';
import { Provider } from 'react-redux';
import { SingUp } from './Component/SingUp/singUp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={setupStore(undefined)}>
      <Routes>
        <Route path="/" element={<LoginAndWorkerSingUp workerLogIn={false} />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/workerlogin" element={<LoginAndWorkerSingUp workerLogIn={true} />} />
        <Route path="/workersingup" element={<LoginAndWorkerSingUp workerSingUp={true} />} />
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
    </Provider>
  </BrowserRouter>
);
reportWebVitals();
