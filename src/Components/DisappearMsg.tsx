import React, { useEffect } from "react";
import { useState } from "react";

function DisappearMsg({ errorMessage }) {
  const [message, setMessage] = useState(" ");
  useEffect(() => {
    if (errorMessage.length > 0) setMessage(errorMessage);
  }, [errorMessage]);

  return (
    <p
      className={`text-center whitespace-pre select-none mt-2 transition ease-out delay-2000 ${
        errorMessage.length > 0 ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </p>
  );
}

export default DisappearMsg;
