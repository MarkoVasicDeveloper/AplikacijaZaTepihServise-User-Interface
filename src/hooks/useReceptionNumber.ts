import { useEffect } from "react";
import api from "../api/api";
import { useTypedSelector } from "./useTypedSelector";
import { selectUserId } from "../redux/user/userSlice";

export function useReceptionNumber () {
  const userId = useTypedSelector(selectUserId);

  useEffect(() => {
    async function setReceptionNumber() {
        const lastNumberReception = await api(
          `api/carpetReception/getBigistReceptionByUser/${userId}`,
          "post",
          {}
        );
        if (lastNumberReception.data.length === 0)
          return localStorage.setItem("reception_user", "1");
  
        localStorage.setItem(
          "reception_user",
          lastNumberReception.data[0].carpetReceptionUser + 1
        );
      }
  
      setReceptionNumber();
  }, [userId])
}