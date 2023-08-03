
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Timer(redirectTo: string, seconds: number) {
  const router = useRouter();
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);

  useEffect(() => {
    //if (secondsRemaining === 0) router.push('/');

    const timer = setTimeout(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
      if (secondsRemaining === 1) router.push(redirectTo);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [router, secondsRemaining, redirectTo]);
  
  return {secondsRemaining}
}
