import { Ref, ref } from 'vue';

import sound from '@/assets/meh.mp3';

const audioPlayer = new Audio('audio');
const statePlaying: { [key: string]: Ref<boolean> } = {};

audioPlayer.src = sound;
// audioPlayer.volume = 0;
audioPlayer.addEventListener('pause', function () {
  Object.values(statePlaying).forEach((v) => (v.value = false));
});

export const useMeh = ({ disabled, id }: { disabled?: Ref<boolean>; id: string }) => {
  const isPlaying = ref(false);
  statePlaying[id] = isPlaying;

  const playMeh = (): any => {
    if (disabled?.value) return;

    if (audioPlayer.paused) {
      const promise = audioPlayer.play();
      if (promise !== undefined) {
        promise.then((_) => (isPlaying.value = true)).catch((_) => (isPlaying.value = false));
      }
    } else {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      return playMeh();
    }
  };
  const deletePlaying = () => {
    delete statePlaying[id];
  };

  return {
    isPlaying,
    playMeh,
    deletePlaying,
  };
};
