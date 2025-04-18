import './styles/styles.css';
import { createWeatherSoundPlayer } from './modules/weatherSoundPlayer';

document.addEventListener('DOMContentLoaded', () => {
    const player = createWeatherSoundPlayer();
    player.init();
});