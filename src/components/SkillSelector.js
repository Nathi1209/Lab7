export class SkillSelector extends HTMLElement {
    set topics(data) {
        this.data = data;
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
            .grid-container {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
            }
            .skill-cube {
                width: 85px;
                height: 85px;
                background: #1e293b;
                border: 2px solid #334155;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 0.75rem;
                text-align: center;
                font-weight: bold;
                color: #94a3b8;
            }
            .skill-cube:hover {
                border-color: #6366f1;
                background: #334155;
                color: white;
            }
            .skill-cube.active {
                background: #f43f5e;
                border-color: white;
                color: white;
                box-shadow: 0 0 15px #f43f5e;
            }
        </style>
        <div class="grid-container">
            ${this.data.map(item => `
                <div class="skill-cube" data-id="${item.id}">
                    <span style="font-size: 1.2rem">${item.icon}</span>
                    <div style="margin-top:5px">${item.title}</div>
                </div>
            `).join('')}
        </div>
        `;

        this.querySelectorAll('.skill-cube').forEach(cube => {
            cube.addEventListener('click', () => {
                this.querySelectorAll('.skill-cube').forEach(c => c.classList.remove('active'));
                cube.classList.add('active');
                
                this.dispatchEvent(new CustomEvent('topicSelected', {
                    detail: cube.dataset.id,
                    bubbles: true
                }));
            });
        });
    }
}
customElements.define('skill-selector', SkillSelector);