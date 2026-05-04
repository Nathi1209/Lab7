import { SkillSelector } from './components/SkillSelector.js';

const COURSES_DATA = [
    { 
        id: '1', title: 'Terminal Pro', icon: '>_', 
        video: 'https://www.youtube.com/embed/Ssh71hePR8Q', 
        highlights: ['0:45 - Navegación básica', '1:20 - Gestión de archivos'],
        hasChapters: false 
    },
    { 
        id: '2', title: 'Git Master', icon: 'GIT', 
        video: 'https://www.youtube.com/embed/RGOj5yH7evk', 
        highlights: ['2:10 - Creando Commits', '5:00 - Pull Requests'],
        hasChapters: true 
    },
    { 
        id: '3', title: 'CSS Layouts', icon: '{ }', 
        video: 'https://www.youtube.com/embed/OXGznpKZ_sA', 
        highlights: ['1:00 - Flexbox dinámico', '3:40 - Grid Avanzado'],
        hasChapters: true 
    }
];

const selector = document.getElementById('selector');
const viewer = document.getElementById('viewer');

// Cargamos la data en el componente
selector.topics = COURSES_DATA;

document.addEventListener('topicSelected', (e) => {
    const topic = COURSES_DATA.find(t => t.id === e.detail);
    
    viewer.innerHTML = `
        <div class="info-panel">
            <h1 style="color: var(--accent); margin: 0 0 20px 0;">${topic.title}</h1>
            <div class="video-container">
                <iframe width="100%" height="100%" src="${topic.video}" frameborder="0" allowfullscreen></iframe>
            </div>
            
            <h3 style="color: var(--primary)">Contenido y Highlights:</h3>
            <ul>
                ${topic.highlights.map(h => `
                    <li>
                        ${topic.hasChapters ? '<span class="tag-chapter">CAPÍTULO</span>' : ''}
                        ${h}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
});