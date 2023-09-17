document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const fileUpload = document.getElementById('fileUpload');
  const fileName = document.getElementById('fileName');
  const proceedButton = document.getElementById('proceedButton');



  proceedButton.addEventListener('click', function() {
    if (sessionStorage.getItem('csvData')) {
      window.location.href = 'variaveis.html';
    } else {
      alert('Por favor, selecione um arquivo CSV antes de prosseguir.');
    }
  });


  // Função para abrir/fechar o menu lateral
  menuBtn.addEventListener('click', function() {
    if (sideMenu.style.transform === 'translateX(100%)') {
      sideMenu.style.transform = 'translateX(0)';
    } else {
      sideMenu.style.transform = 'translateX(100%)';
    }
  });

  // Função para mostrar o nome do arquivo selecionado
  fileUpload.addEventListener('change', function() {
    if (fileUpload.files.length > 0) {
      fileName.textContent = fileUpload.files[0].name;
    }
  });

  // Função para converter CSV para JSON e armazenar no sessionStorage
  fileUpload.addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const csvData = e.target.result;
      const jsonData = csvToJSON(csvData);
      const compressedData = LZString.compressToUTF16(JSON.stringify(jsonData));
      sessionStorage.setItem('csvData', compressedData);
    };
    reader.readAsText(fileUpload.files[0]);
  });
});

// Função para converter CSV para JSON
function csvToJSON(csv) {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(';').map(header => header.trim().toLowerCase().replace(/ /g, '_'));

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue; // Ignora linhas em branco

    const obj = {};
    const currentLine = lines[i].split(';');
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j].trim();
    }
    result.push(obj);
  }
  return result;
}
