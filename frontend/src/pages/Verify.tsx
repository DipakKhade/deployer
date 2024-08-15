import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../lib/utils";

export function Verify() {
  const { id, token } = useParams();
  const [isVerfied, SetisVerified] = useState<boolean>(false);
  const navigator = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/user/verify/${id}/${token}`
      );
      if (response.data.success) {
            SetisVerified(true);
        setTimeout(()=>{
            navigator(`/addpassword/${response.data.userid}/${response.data.email}`)
        },2000)
      }
    })();
  }, []);
  return (
    <>
      <div>
        {isVerfied ? (
          <div className="min-h-screen m-auto flex text-5xl justify-center align-middle pt-36">
            <div
              className="animate-spin inline-block size-16 border-[3px] border-current border-t-transparent text-purple-600 rounded-full dark:text-blue-500 text-3xl pr-4"
              role="status"
              aria-label="loading"
            >
            </div>
            <span className="ml-4">
            verfiying ...
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
