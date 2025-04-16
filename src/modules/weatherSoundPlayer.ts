import soundSummer from '../assets/sounds/summer.mp3';
import soundRain from '../assets/sounds/rain.mp3';
import soundWinter from '../assets/sounds/winter.mp3';

import iconSun from '../assets/icons/sun.svg';
import iconRainIcon from '../assets/icons/cloud-rain.svg';
import iconSnow from '../assets/icons/cloud-snow.svg';

import bgSummer from '../assets/summer-bg.jpg';
import bgRain from '../assets/rainy-bg.jpg';
import bgWinter from '../assets/winter-bg.jpg';

export function createWeatherSoundPlayer(): {init: () => void} {
    let audio: HTMLAudioElement | null = null;
    let currentSound: string | null = null;
    let volume: number = 0.5;
    let container: HTMLElement | null = null;

    interface WeatherPreset {
        label: string;
        icon: string;
        sound: string;
        bg: string;
    }

    const configs: WeatherPreset[] = [
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

    function init(): void {
        container = document.getElementById('buttons-container');
        if (!container) return;
        changeBackground(configs[0].bg);
        createButtons(container);
        initVolumeControl();
    }

    function createButtons(parent: HTMLElement): void {
        configs.forEach((cfg) => {
            const btn = document.createElement('button');
            btn.classList.add('button');
            btn.style.backgroundImage = `url(${cfg.bg})`;

            const img = document.createElement('img');
            img.src = cfg.icon;
            img.alt = cfg.label;

            btn.appendChild(img);
            parent.appendChild(btn);

            btn.addEventListener('click', () => toggleSound(cfg, btn));
        });
    }

    function initVolumeControl() {
        const volumeSlider = document.getElementById('volume-slider') as HTMLInputElement;

        const updateTrackStyle = () => {
            const val = parseFloat(volumeSlider.value);
            const min = parseFloat(volumeSlider.min);
            const max = parseFloat(volumeSlider.max);
            const percent = ((val - min) / (max - min)) * 100;
            volumeSlider.style.setProperty('--progress', `${percent}%`);
        };

        volumeSlider.addEventListener('input', (e: Event): void => {
            const target = e.target as HTMLInputElement
            if (!target) return;
            volume = parseFloat(target.value);
            if (audio) {
                audio.volume = volume;
            }
            updateTrackStyle();
        });

        updateTrackStyle();
    }

    function toggleSound(cfg: WeatherPreset, btn: HTMLButtonElement): void {
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

    function playSound(soundFile: string, btn: HTMLButtonElement): void {
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

    function changeBackground(bgFile: string): void {
        document.body.style.backgroundImage = `url(${bgFile})`;
    }

    function updateActiveButton(activeBtn: HTMLButtonElement): void {
        const allBtns = container!.querySelectorAll('.button');
        allBtns.forEach((btn) => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    return {
        init,
    };
}
