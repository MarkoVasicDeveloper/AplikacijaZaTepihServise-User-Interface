import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCoordinates, setUser } from '../redux/user/userSlice';
import api, { ApiResponse, saveRefreshToken, saveToken } from '../api/api';
import { errorHandler, positionOptions } from '../misc/Location';

export function useLoginCheck(data: Record<string, any>): {
  sendData: (data: Record<string, any>, event: React.ChangeEvent) => void
  message: string
} {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  useEffect(() => {setMessage('')}, [data]);

  const sendData = (data: Record<string, any>,event: React.ChangeEvent): void => {
    event.preventDefault();

    if (data.password && data.email) {
      
      const login = async function (): Promise<ApiResponse> {
        return await api("auth/user", "post", { email: data.email, password: data.password }, "user");
      };

      login()
        .then((res): void => {
          if (!res.data.token) return setMessage('Email ili lozinka nisu tacni!');

          saveToken("user", res.data.token);
          saveRefreshToken("user", res.data.refreshToken);

          const user = async (): Promise<ApiResponse> => await api(
            `api/user/getUserById/${res.data.Id}`, "post", {}, "user");

          user()
            .then(res => {
              dispatch(setUser({
                userId: res.data.userId,
                name: res.data.name,
                surname: res.data.surname,
                phone: res.data.phone,
                city: res.data.city,
                email: res.data.email,
                address: res.data.adress,
                login: true
              }))

              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) =>
                    dispatch(setCoordinates({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })),
                    errorHandler,
                    positionOptions
                );
              } else {
                alert('Lokacija nije omogucena! Ako zelite da koristite sve funkcionalnosti, morate omoguciti lokaciju!')
              };

              navigate('/workerlogin', { replace: true });
            })
            .catch(() => setMessage('Nestom nije u redu!'))
        })
        .catch(() => {
          setMessage('Nestom nije u redu!');
        });
    }
  };
  return { sendData, message };
}
