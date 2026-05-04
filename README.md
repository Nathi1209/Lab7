## Prompt utilizado para la generación de la base técnica:
"Actúa como un Senior Frontend Developer. Crea una plataforma de cursos interactiva utilizando 
HTML5, CSS3 y JavaScript Vanilla, aplicando la arquitectura de WebComponents nativos para 
asegurar la reutilización y modularidad del código.

Requerimientos de Interfaz (UI/UX):
1. Layout: Diseño de dos columnas. 
   - Lado izquierdo: Un menú lateral (sidebar) que contiene un 'Skill Tree' (árbol de habilidades).
   - Lado derecho: Área principal de visualización de contenido.
2. Estilo 'Street Fighter': El Skill Tree debe presentarse como un grid de cubos compactos 
   con esquinas afiladas (sin border-radius). Al estilo del selector de personajes de juegos de lucha.
3. Temática Visual: Modo oscuro (Dark Mode) con una paleta de colores basada en:
   - Fondo: Tonos oscuros/negros profundos.
   - Acentos: Indigo (#6366f1) y Deeppink (#f43f5e).
   - Tipografía: Limpia y moderna (sans-serif).

Arquitectura de Datos:
La plataforma debe manejar una jerarquía de: Curso > Fase > Tema.
- Cada Tema es un cubo del grid.
- Al seleccionar un Tema, la parte derecha debe mostrar:
  - Video principal de YouTube (long-form).
  - Sección de 'Highlights' (puntos clave en minutos específicos).
  - Sección opcional de 'Capítulos' (mini-videos resumidos).

Restricciones Técnicas:
- Uso obligatorio de WebComponents (Custom Elements) para el Grid de habilidades y el visor de temas.
- Código limpio, sin librerías externas (Vanilla JS).
- El sistema de navegación debe ser reactivo al hacer clic en los cubos del grid."

Código base generado por IA:
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkillTree Learning Platform</title>
    <style>
        :root {
            --bg: #020617;
            --surface: #1e293b;
            --primary: #6366f1; /* Indigo */
            --accent: #f43f5e;  /* Deeppink */
            --text: #f8fafc;
            --border: #334155;
        }

        body {
            margin: 0;
            display: flex;
            height: 100vh;
            background: var(--bg);
            color: var(--text);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Sidebar */
        aside {
            width: 320px;
            background: #0f172a;
            border-right: 2px solid var(--primary);
            padding: 20px;
            display: flex;
            flex-direction: column;
        }

        h2 { 
            color: var(--primary); 
            font-size: 1.2rem; 
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 30px;
            border-bottom: 2px solid var(--accent);
            padding-bottom: 10px;
        }

        /* Contenedor Principal */
        main {
            flex: 1;
            padding: 40px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .video-container {
            width: 100%;
            max-width: 800px;
            aspect-ratio: 16/9;
            background: #000;
            margin-bottom: 20px;
            border: 3px solid var(--primary);
        }

        /* Estilos del WebComponent */
        .grid-layout {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }

        .skill-cube {
            width: 80px;
            height: 80px;
            background: var(--surface);
            border: 2px solid var(--border);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.7rem;
            text-align: center;
            font-weight: bold;
        }

        .skill-cube:hover {
            border-color: var(--primary);
            background: #334155;
            transform: scale(1.05);
        }

        .skill-cube.active {
            background: var(--accent);
            border-color: white;
            box-shadow: 0 0 15px var(--accent);
        }

        .info-panel { width: 100%; max-width: 800px; }
        .tag { background: var(--primary); padding: 4px 8px; font-size: 0.8rem; margin-right: 5px; }
    </style>
</head>
<body>

    <aside>
        <h2>Skill Tree JS</h2>
        <skill-selector id="selector"></skill-selector>
    </aside>

    <main id="viewer">
        <h1 style="color: var(--border)">Selecciona un cubo del Skill Tree</h1>
    </main>

    <script type="module">
        // Datos de ejemplo para que se vea contenido
        const DATA = [
            { id: 1, title: 'Terminal', icon: '>_', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', highlights: ['0:45 - Comandos Pro', '1:20 - SSH'] },
            { id: 2, title: 'Git & GitHub', icon: 'GIT', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', highlights: ['2:10 - Commits', '5:00 - Rebase'] },
            { id: 3, title: 'HTML5', icon: '</>', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', highlights: ['0:10 - Semántica'] },
            { id: 4, title: 'CSS Layouts', icon: '{ }', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', highlights: ['1:00 - Flexbox', '3:40 - Grid'] },
            { id: 5, title: 'JS Basics', icon: 'JS', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', highlights: ['0:30 - Variables'] },
            { id: 6, title: 'Async JS', icon: 'ASYNC', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', highlights: ['4:15 - Promises'] }
        ];

        class SkillSelector extends HTMLElement {
            connectedCallback() {
                this.innerHTML = `<div class="grid-layout">${DATA.map(item => `
                    <div class="skill-cube" data-id="${item.id}">
                        <span>${item.icon}</span>
                        <div style="margin-top:5px">${item.title}</div>
                    </div>
                `).join('')}</div>`;

                this.querySelectorAll('.skill-cube').forEach(cube => {
                    cube.addEventListener('click', (e) => this.selectTopic(e.currentTarget));
                });
            }

            selectTopic(element) {
                // UI: Marcar activo
                document.querySelectorAll('.skill-cube').forEach(c => c.classList.remove('active'));
                element.classList.add('active');

                // Lógica: Cargar datos
                const topic = DATA.find(t => t.id == element.dataset.id);
                const viewer = document.getElementById('viewer');
                
                viewer.innerHTML = `
                    <div class="info-panel">
                        <h1 style="color: var(--accent)">${topic.title}</h1>
                        <div class="video-container">
                            <iframe width="100%" height="100%" src="${topic.video}" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <h3>Highlights del tema:</h3>
                        <ul>
                            ${topic.highlights.map(h => `<li>${topic.id == 4 ? '<span class="tag">CAPÍTULO</span>' : ''} ${h}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        }

        customElements.define('skill-selector', SkillSelector);
    </script>
</body>
</html>

