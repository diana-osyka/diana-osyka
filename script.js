document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            date: '2024',
            name: 'Hack Kosice Hackathon - Weather AI',
            tags: '#Python #TensorFlow #FastAPI #NumPy #sklearn #Vue JS',
            linkGit: 'https://github.com/Lyten1/ibl_weather',
            linkFigma: 'https://www.figma.com/design/8qRtbK7y90BIW9b8AzZIw3/Untitled?node-id=0-1&t=Vz8SzUfO954QQwXF-0',
            description: `An application to provide weather insights, warnings, and safety recommendations<br>
            ● AI-driven solution for weather challenges<br>
            ● Integrates data analytics and AI for weather forecasting and disaster detection.<br>
            ● Dataset creation, cutting-edge AI solutions, Vue JS front-end.<br>
            ● Built With: Python, TensorFlow, FastAPI, NumPy, sklearn, Vue JS.<br>
            ● Role: A designer, front-end developer & as a team-leader helped with back-end`
        },
        {
            date: '2023',
            name: 'Deutsche Telekom Hackathon',
            tags: '#JavaScript #React #Node.js',
            linkGit: 'https://github.com/TELIT-Hackathon2023/4-team_404',
            linkFigma: 'https://www.figma.com/design/twlMWltGdsHUkPcVMjGV2p/Untitled?node-id=1-34&t=Jck6MRQS2eHTDlh2-0',
            description: `LLM trained on multilingual DB — GitHub, Figma 2023<br>
            ● System that can extract relevant solutions from a Knowledge Base DB when given questions as input.<br>
            ● Design and implement an effective retrieval mechanism that aligns user questions with the content
            stored in the Knowledge Base.<br>
            ● Cross-lingual capable of understanding questions and different languages and delivering answers
            accordingly. System able to provide answers in various languages.`
        },
        {
            date: '2023',
            name: 'Body Assistant Application',
            tags: '#Java #Spring Boot #MySQL',
            linkGit: 'https://github.com/diana-osyka/diana-osyka/tree/main/frontend/bodyAssistant',
            linkFigma: 'https://www.figma.com/design/Y8E6iHI7wd0NaDMpk3Q9QB/Untitled-(Copy)?node-id=1-10&t=Duh7FkLgoeZWGtNQ-0',
            description: `An app to help people track their health state, choose a training plan, set goals, etc — GitHub, Figma<br>
            ● Team took part in a volontery project to gain experience in real development.<br>
            ● Team leads had over 2 years of work experience in IT.<br>
            ● Jira was used for communication and managing tasks.<br>
            ● Developers were divided into front-end and back-end teams, and each of us focused on our own areas
            of the work.<br>
            ● Role: A designer and front-end developer on the project`
        },
        {
            date: '2020',
            name: 'Project 4',
            tags: '#C++ #Qt #OpenGL',
            linkGit: 'https://github.com/Lyten1/ibl_weather',
            linkFigma: 'https://www.figma.com/design/8qRtbK7y90BIW9b8AzZIw3/Untitled?node-id=0-1&t=Vz8SzUfO954QQwXF-0',
            description: `An application to provide weather insights, warnings, and safety recommendations — GitHub, Figma<br>
            ● AI-driven solution for weather challenges<br>
            ● Integrates data analytics and AI for weather forecasting and disaster detection.<br>
            ● Dataset creation, cutting-edge AI solutions, Vue JS front-end.<br>
            ● Built With: Python, TensorFlow, FastAPI, NumPy, sklearn, Vue JS.<br>
            ● Role: A designer, front-end developer & as a team-leader helped with back-end`
        }
    ];

    const projectsContainer = document.getElementById('projectsContainer');

    projects.forEach(project => {
        const projectBlock = document.createElement('a');
        projectBlock.classList.add('projectBlock');
        projectBlock.setAttribute('href', project.link);

        const projectDate = document.createElement('span');
        projectDate.classList.add('projectDate');
        projectDate.textContent = project.date;

        const projectName = document.createElement('h2');
        projectName.classList.add('projectName');
        projectName.textContent = project.name;

        const projectTags = document.createElement('h2');
        projectTags.classList.add('projectTags');
        projectTags.textContent = project.tags;

        const projectBlockDesc = document.createElement('div');
        projectBlockDesc.classList.add('projectDescription');
        projectBlockDesc.innerHTML = `<a class="aBasic" href="${project.linkGit}">GitHub</a>, <a class="aBasic" href="${project.linkFigma}">Figma</a><br>` + project.description;

        projectBlock.appendChild(projectName);
        projectBlock.appendChild(projectTags);
        projectBlock.appendChild(projectDate);

        const Block = document.createElement('div');
        Block.classList.add('projectWrapper');
        Block.appendChild(projectBlock);
        Block.appendChild(projectBlockDesc);

        projectsContainer.appendChild(Block);
    });
});