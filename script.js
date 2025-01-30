// Dados para o gráfico de tendências da pobreza
const ctx = document.getElementById('graficoPobreza').getContext('2d');
const graficoPobreza = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['1820', '1910', '1980', '2000', '2020'],
        datasets: [{
            label: 'Taxa de Pobreza Global (%)',
            data: [44, 34, 26, 16, 9], // Exemplo de taxas de pobreza global ao longo dos anos
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Taxa de Pobreza (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Ano'
                }
            }
        }
    }
});

// Mapa da linha de pobreza em diferentes países
const mapa = L.map('mapaPobreza').setView([20, 0], 2);

// Adicionando camada de tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);

// Função para adicionar dados de pobreza usando um arquivo GeoJSON (dados reais)
fetch('path/para/o/seu/arquivo.geojson') // Substitua com o caminho correto do arquivo GeoJSON
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: (feature, layer) => {
                // Exibir o nome do país e a linha de pobreza
                layer.bindPopup(`<b>País: </b>${feature.properties.name}<br><b>Linha de Pobreza: </b>${feature.properties.poverty_line} USD/dia`);
            },
            style: (feature) => {
                // Estilize os países com base na linha de pobreza
                return {
                    color: 'blue',
                    weight: 1,
                    fillOpacity: 0.7,
                    fillColor: feature.properties.poverty_line < 1.9 ? 'red' : 'green'
                };
            }
        }).addTo(mapa);
    })
    .catch(err => console.error('Erro ao carregar dados do GeoJSON: ', err));
