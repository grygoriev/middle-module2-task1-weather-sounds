import soundSummer from '../assets/sounds/summer.mp3';
import soundRain from '../assets/sounds/rain.mp3';
import soundWinter from '../assets/sounds/winter.mp3';

import iconSun from '../assets/icons/sun.svg';
import iconRainIcon from '../assets/icons/cloud-rain.svg';
import iconSnow from '../assets/icons/cloud-snow.svg';

import bgSummer from '../assets/summer-bg.jpg';
import bgRain from '../assets/rainy-bg.jpg';
import bgWinter from '../assets/winter-bg.jpg';

export function createWeatherSoundPlayer() {
    let audio = null;
    let currentSound = null;
    let volume = 0.5;
    let container = null;

    const configs = [
        {
            label: 'Summer',
            icon: iconSun,
            sound: soundSummer,
            bg: bgSummer
        },
        {
            label: 'Rain',
            icon: iconRainIcon,
            sound: soundRain,
            bg: bgRain
        },
        {
            label: 'Winter',
            icon: iconSnow,
            sound: soundWinter,
            bg: bgWinter
        },
    ];

    function init() {
        container = document.getElementById('buttons-container');
        if (!container) return;
        changeBackground(configs[0].bg);
        createButtons();
        initVolumeControl();
    }

    function createButtons() {
        configs.forEach((cfg) => {
            const btn = document.createElement('button');
            btn.classList.add('button');
            btn.style.backgroundImage = `url(${cfg.bg})`;

            const img = document.createElement('img');
            img.src = cfg.icon;
            img.alt = cfg.label;

            btn.appendChild(img);
            container.appendChild(btn);

            btn.addEventListener('click', () => toggleSound(cfg, btn));
        });
    }

    function initVolumeControl() {
        const volumeSlider = document.getElementById('volume-slider');

        const updateTrackStyle = () => {
            const val = parseFloat(volumeSlider.value);
            const min = parseFloat(volumeSlider.min);
            const max = parseFloat(volumeSlider.max);
            const percent = ((val - min) / (max - min)) * 100;
            volumeSlider.style.setProperty('--progress', `${percent}%`);
        };

        volumeSlider.addEventListener('input', (e) => {
            volume = parseFloat(e.target.value);
            if (audio) {
                audio.volume = volume;
            }
            updateTrackStyle();
        });

        updateTrackStyle();
    }

    function toggleSound(cfg, btn) {
        if (currentSound === cfg.sound) {
            if (audio && audio.paused) {
                audio.play();
                btn.classList.add('active');
            } else if (audio) {
                audio.pause();
                btn.classList.remove('active');
            }
        } else {
            playSound(cfg.sound, btn);
            changeBackground(cfg.bg);
        }
    }

    function playSound(soundFile, btn) {
        if (audio) {
            audio.pause();
        }
        audio = new Audio(soundFile);
        audio.volume = volume;
        audio.loop = true;
        audio.play();

        currentSound = soundFile;
        updateActiveButton(btn);
    }

    function changeBackground(bgFile) {
        document.body.style.backgroundImage = `url(${bgFile})`;
    }

    function updateActiveButton(activeBtn) {
        const allBtns = container.querySelectorAll('.button');
        allBtns.forEach((btn) => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    return {
        init,
    };
}
