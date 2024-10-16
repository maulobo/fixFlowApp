'use client';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';
export function TypewriterEffectSmoothMine() {
  const words = [
    {
      text: 'Gestion'
    },
    {
      text: 'estratégica'
    },
    {
      text: 'de'
    },

    {
      text: 'Devoluciones.',
      className: 'text-blue-500 dark:text-blue-500'
    }
  ];
  return (
    <div className="flex h-[40rem] flex-col items-center justify-center  ">
      <p className="text-xl text-neutral-600 sm:text-base dark:text-neutral-200  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <button className="h-10 w-60 rounded-xl border border-transparent bg-black text-sm text-white dark:border-white">
          Join now
        </button>
        <button className="h-10 w-60 rounded-xl border border-black bg-white text-sm  text-black">
          Signup
        </button>
      </div>
    </div>
  );
}
