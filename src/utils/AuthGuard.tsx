import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useActiveWallet } from 'thirdweb/react';

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {

  const wallet = useActiveWallet();

  const [moveForward, setMoveForward] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const temp = localStorage.getItem("auth")
    setToken(temp)
  }, [])

  useEffect(() => {
    const temp = wallet && token !== null
    setMoveForward(temp || false)
  }, [moveForward, token, wallet])

	if (!moveForward) return <></>;

	return <>{children}</>;
};
