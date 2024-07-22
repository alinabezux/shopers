import { useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

const useUser = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userId = authService.getUser();
    if (userId !== null) {
      setUserId(userId);
    } else setUserId(null)
  }, []);

  return userId;
};

export default useUser;
