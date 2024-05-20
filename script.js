document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            date: '2024',
            name: 'Hack Kosice Hackathon - Weather AI',
            tags: '#Python #TensorFlow #FastAPI #NumPy #sklearn #Vue JS'
        },
        {
            date: '2023',
            name: 'Deutsche Telekom Hackathon',
            tags: '#JavaScript #React #Node.js'
        },
        {
            date: '2023',
            name: 'Body Assistant Application',
            tags: '#Java #Spring Boot #MySQL'
        },
        {
            date: '2020',
            name: 'Project 4',
            tags: '#C++ #Qt #OpenGL'
        }
    ];

    const projectsContainer = document.getElementById('projectsContainer');

    projects.forEach(project => {
        const projectBlock = document.createElement('div');
        projectBlock.classList.add('projectBlock');

        const projectDate = document.createElement('span');
        projectDate.classList.add('projectDate');
        projectDate.textContent = project.date;

        const projectName = document.createElement('h2');
        projectName.classList.add('projectName');
        projectName.textContent = project.name;

        const projectTags = document.createElement('h2');
        projectTags.classList.add('projectTags');
        projectTags.textContent = project.tags;

        const arrow = document.createElement('div');
        arrow.classList.add('Arrow');
        arrow.textContent = '>';

        projectBlock.appendChild(projectDate);
        projectBlock.appendChild(projectName);
        projectBlock.appendChild(projectTags);
        projectBlock.appendChild(arrow);

        projectsContainer.appendChild(projectBlock);
    });
});