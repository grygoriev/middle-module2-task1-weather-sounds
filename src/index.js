import './styles/styles.css';
import { createWeatherSoundPlayer } from './modules/weatherSoundPlayer.js';

document.addEventListener('DOMContentLoaded', () => {
    const player = createWeatherSoundPlayer();
    player.init();
});