import './styles/styles.css';
import { createWeatherSoundPlayer } from './modules/weatherSoundPlayer';

document.addEventListener('DOMContentLoaded', () => {
    const player: {init: () => void} = createWeatherSoundPlayer();
    player.init();
});