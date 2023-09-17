document.addEventListener("DOMContentLoaded", function() {
  const compressedData = sessionStorage.getItem("csvData");
  const decompressedData = LZString.decompressFromUTF16(compressedData);
  const data = JSON.parse(decompressedData);
  const totalRecords = data.length;

  const riskJudicialRecords = data.filter(record => record.faixa_atraso_divida_anos != "10 a 11 anos").length;
  const riskJudicialPercentage = (riskJudicialRecords / totalRecords) * 100;

  document.getElementById("riskPercentage").textContent = riskJudicialPercentage.toFixed(2) + "%";

  // Preencha os outros valores de forma semelhante, usando as propriedades correspondentes do data storage.
});