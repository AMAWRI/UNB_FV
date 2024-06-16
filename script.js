document.addEventListener("DOMContentLoaded", function() {
    const cards = [
        { id: "card1", title: "Iphone", imageUrl: "images/1.png", class: "classe1" },
        { id: "card2", title: "Motorola", imageUrl: "images/2.png", class: "classe1" },
        { id: "card3", title: "LG", imageUrl: "images/3.png", class: "classe1" },
        { id: "card4", title: "Samsung", imageUrl: "images/4.png", class: "classe1" },
        { id: "card5", title: "Huawei", imageUrl: "images/5.png", class: "classe1" },
        { id: "card6", title: "Xiaomi", imageUrl: "images/6.png", class: "classe1" },
        { id: "card7", title: "(Ponto positivo)", imageUrl: "images/7.png", class: "classe2" },
        { id: "card8", title: "(Ponto Negativo)", imageUrl: "images/8.png", class: "classe3" }
    ];

    const cardContainer = document.getElementById('card-container');
    const drawCardButton = document.getElementById('draw-card');
    const remainingCombinationsDisplay = document.getElementById('remaining-combinations');
    const messageDisplay = document.getElementById('message');
    const sortedCombinationField = document.getElementById('sorted-combination');
    const responseForm = document.getElementById('response-form');
    const downloadCsvButton = document.getElementById('download-csv');
    const exitButton = document.getElementById('exit-button');

    const responses = [];

    function generateCombinations(array) {
        const result = [];
        for (let i = 0; i < array.length - 2; i++) {
            for (let j = i + 1; j < array.length - 1; j++) {
                for (let k = j + 1; k < array.length; k++) {
                    result.push([array[i], array[j], array[k]]);
                }
            }
        }
        return result;
    }

    const allCombinations = generateCombinations(cards);
    let remainingCombinations = [...allCombinations];

    function displayCards(selectedCards) {
        cardContainer.innerHTML = '';
        selectedCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'col-md-4 mb-3';
            cardElement.innerHTML = `
                <div class="card" style="padding: 25px">
                    <img src="${card.imageUrl}" class="card-img-top" alt="${card.title}" >
                    <div class="card-body" style="margin-bottom: -35px;  text-align: center">
                        <h5 class="card-title">${card.title}</h5>
                    </div>
                </div>
            `;
            cardContainer.appendChild(cardElement);
        });
    }

    function showMessage(combination) {
        const classes = combination.map(card => card.class);
    
        // Seleciona o elemento onde as mensagens são exibidas
        const messageDisplay = document.getElementById("alert-message");
    
        // Seleciona o container do alerta
        const alertContainer = document.getElementById("alert-container");
    
        // Aplica estilos e conteúdo da mensagem
        alertContainer.style.display = "block"; // Exibe o container do alerta
        alertContainer.classList.remove("alert-success", "alert-info", "alert-warning", "alert-danger"); // Remove classes anteriores
        alertContainer.classList.add("alert-info"); // Adiciona classe de alerta Bootstrap
        messageDisplay.textContent = ""; // Limpa o conteúdo anterior
    
        if (classes.includes("classe1") && classes.includes("classe1") && classes.includes("classe1")) {
            messageDisplay.textContent = "Escolha duas marcas e fale sobre uma semelhança entre duas marcas e uma característica única da terceira";
        } else if ((classes.includes("classe1") && classes.includes("classe1") && classes.includes("classe2")) ||
                   (classes.includes("classe1") && classes.includes("classe2") && classes.includes("classe1")) ||
                   (classes.includes("classe2") && classes.includes("classe1") && classes.includes("classe1"))) {
            messageDisplay.textContent = "Fale sobre um ponto positivo de cada marca";
        } else if (classes.includes("classe1") && classes.includes("classe1") && classes.includes("classe3")) {
            messageDisplay.textContent = "Fale sobre um ponto negativo de cada marca";
        } else if (classes.includes("classe1") && classes.includes("classe2") && classes.includes("classe3")) {
            messageDisplay.textContent = "Fale sobre um ponto negativo e um positivo da marca";
        }
    
        
    }
    

    drawCardButton.addEventListener('click', function() {
        if (remainingCombinations.length === 0) {
            alert('Todas as combinações foram sorteadas!');
            return;
        }

        const randomIndex = Math.floor(Math.random() * remainingCombinations.length);
        const selectedCombination = remainingCombinations.splice(randomIndex, 1)[0];
        displayCards(selectedCombination);
        showMessage(selectedCombination);

        const combinationText = selectedCombination.map(card => card.title).join(', ');
        sortedCombinationField.value = combinationText;

        remainingCombinationsDisplay.textContent = `Combinações restantes: ${remainingCombinations.length}`;
    });

    remainingCombinationsDisplay.textContent = `Combinações restantes: ${remainingCombinations.length}`;

    responseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const response = document.getElementById('response').value.trim();

        if (response === "") {
            alert("Por favor, preencha a resposta antes de salvar.");
            return;
        }

        const combinationText = sortedCombinationField.value;
        responses.push({ combination: combinationText, response });

        alert('Resposta salva com sucesso!');
        responseForm.reset();

        // Habilitar botão de download quando houver pelo menos 5 respostas
        if (responses.length >= 5) {
            downloadCsvButton.disabled = false;
        }
    });

    function downloadCSV() {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Combinação Sorteada,Resposta\n";

        responses.forEach(row => {
            csvContent += `${row.combination},${row.response}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "responses.csv");
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    }

    downloadCsvButton.addEventListener('click', downloadCSV);

    exitButton.addEventListener('click', function() {
        alert("Muito obrigado por colaborar com meu trabalho acadêmico. Sua participação foi muito importante!");
        window.location.href = "https://www.google.com";
    });
});
