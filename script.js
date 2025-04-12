
    let studentNames = [];
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    document.getElementById('generateGroups').addEventListener('click', generateGroups);
    function handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        studentNames = reader.result
          .split(',')
          .map(name => name.trim())
          .filter(name => name)
          .sort((a, b) => a.localeCompare(b));
        displayNames();
      };
      reader.readAsText(file);
    }
    function displayNames() {
      const container = document.getElementById('namesContainer');
      container.innerHTML = '<h3>Lista de Estudantes</h3>';
      studentNames.forEach((name, index) => {
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.marginBottom = '8px';
        const input = document.createElement('input');
        input.value = name;
        input.className = 'name-entry';
        input.style.flexGrow = '1';
        input.addEventListener('input', () => {
          studentNames[index] = input.value.trim();
        });
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '&#10005;';
        removeBtn.title = 'Remover';
        removeBtn.style.marginLeft = '10px';
        removeBtn.style.backgroundColor = 'transparent';
        removeBtn.style.border = 'none';
        removeBtn.style.color = '#dc3545';
        removeBtn.style.fontWeight = 'bold';
        removeBtn.style.fontSize = '18px';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.padding = '4px 8px';
        removeBtn.style.borderRadius = '50%';
        removeBtn.onclick = () => {
          studentNames.splice(index, 1);
          displayNames();
        };
        wrapper.appendChild(input);
        wrapper.appendChild(removeBtn);
        container.appendChild(wrapper);
      });
      const addButton = document.createElement('button');
      addButton.textContent = 'Adicionar Nome';
      addButton.style.margin = '10px 0 10px 0';
      addButton.onclick = () => {
        studentNames.push('');
        displayNames();
      };
      const addWrapper = document.createElement('div');
      addWrapper.appendChild(addButton);
      addWrapper.style.marginTop = '10px';
      container.appendChild(addWrapper);
      const hr = document.createElement('hr');
      hr.style.margin = '20px 0';
      hr.style.border = 'none';
      hr.style.borderTop = '1px solid #ccc';
      container.appendChild(hr);
    }
    function generateGroups() {
      const size = parseInt(document.getElementById('groupSize').value);
      if (isNaN(size) || size <= 0) {
        alert('Informe um tamanho de grupo válido.');
        return;
      }
      const shuffled = [...studentNames].filter(name => name).sort(() => Math.random() - 0.5);
      const total = shuffled.length;
      const numGroups = Math.ceil(total / size);
      const minGroupSize = Math.floor(total / numGroups);
      const numLargerGroups = total % numGroups;
      const groups = [];
      let index = 0;
      for (let i = 0; i < numGroups; i++) {
        const currentGroupSize = i < numLargerGroups ? minGroupSize + 1 : minGroupSize;
        groups.push(shuffled.slice(index, index + currentGroupSize));
        index += currentGroupSize;
      }
      const container = document.getElementById('groupsContainer');
      container.innerHTML = '<h3>Grupos Gerados</h3>';
      groups.forEach((group, i) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';
        groupDiv.innerHTML = `<strong>Grupo ${i + 1}</strong><br>${group.join('<br>')}`;
        container.appendChild(groupDiv);
      });
    }
  