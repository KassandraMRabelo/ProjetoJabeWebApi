document.addEventListener('DOMContentLoaded', function () {

    /* ================= ELEMENTOS ================= */
    const emergencyTrigger = document.getElementById('emergencyTrigger');
    const reportTrigger = document.getElementById('reportTrigger');
    const emergencyForm = document.getElementById('emergencyForm');
    const detailedReportForm = document.getElementById('detailedReportForm');
    const immediateAlertForm = document.getElementById('immediateAlertForm');
    const detailedReportFormElement = document.getElementById('detailedReportFormElement');
    const cancelEmergency = document.getElementById('cancelEmergency');
    const cancelReport = document.getElementById('cancelReport');
    const getLocationBtn = document.getElementById('getLocationBtn');
    const locationStatus = document.getElementById('locationStatus');
    const reportDescription = document.getElementById('reportDescription');
    const charCount = document.getElementById('charCount');
    const toggleAgressorInfo = document.getElementById('toggleAgressorInfo');
    const agressorInfoForm = document.getElementById('agressorInfoForm');

    const confirmationModal = document.getElementById('confirmationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    let emergencyCoords = null;

    /* ================= UTIL ================= */
    function hideForms() {
        emergencyForm.style.display = 'none';
        detailedReportForm.style.display = 'none';
    }

    function showConfirmationModal(title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        confirmationModal.style.display = 'flex';
    }

    /* ================= GEOLOCALIZAÇÃO ================= */
    async function getCurrentLocation() {
        locationStatus.textContent = 'Obtendo localização...';

        navigator.geolocation.getCurrentPosition(
            (position) => {
                emergencyCoords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                locationStatus.textContent = 'Localização obtida com sucesso!';
            },
            () => {
                alert('Erro ao obter localização');
            }
        );
    }

    /* ================= ALERTA IMEDIATO ================= */
    async function handleEmergencySubmit(e) {
        e.preventDefault();
        console.log("SUBMIT ALERTA");

        if (!emergencyCoords) {
            alert('Obtenha a localização antes de enviar.');
            return;
        }

        const nome = document.getElementById('emergencyName').value;
        const cpf = document.getElementById('emergencyCpf').value;
        const telefone = document.getElementById('emergencyPhone').value;

        try {
            const response = await fetch("http://127.0.0.1:8000/api/alerta/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    nome,
                    cpf,
                    telefone,
                    latitude: emergencyCoords.latitude,
                    longitude: emergencyCoords.longitude
                })
            });

            const data = await response.json();
            console.log("RESPOSTA ALERTA:", data);

            showConfirmationModal(
                "Alerta enviado!",
                "As autoridades foram acionadas."
            );

            immediateAlertForm.reset();
            hideForms();

        } catch (error) {
            console.error(error);
            alert("Erro ao enviar alerta");
        }
    }

    /* ================= DENÚNCIA ================= */
    async function handleReportSubmit(e) {
        e.preventDefault();
        console.log("SUBMIT DENÚNCIA");

        const anonima = document.getElementById('anonymousReport')?.checked || false;
        const nome = document.getElementById('reportName').value;
        const cpf = document.getElementById('reportCpf').value;
        const telefone = document.getElementById('reportPhone').value;
        const tipo = document.getElementById('reportType').value;
        const local = document.getElementById('reportLocation').value;
        const descricao = document.getElementById('reportDescription').value;

        const agressor_nome = document.getElementById('agressorNome')?.value || '';
        const agressor_idade = document.getElementById('agressorIdade')?.value || '';
        const agressor_descricao = document.getElementById('agressorDescricao')?.value || '';
        const agressor_relacionamento = document.getElementById('agressorRelacionamento')?.value || '';
        const agressor_endereco = document.getElementById('agressorEndereco')?.value || '';

        try {
            const response = await fetch("http://127.0.0.1:8000/api/denuncia/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    anonima,
                    nome,
                    cpf,
                    telefone,
                    tipo,
                    local,
                    descricao,
                    agressor_nome,
                    agressor_idade,
                    agressor_descricao,
                    agressor_relacionamento,
                    agressor_endereco
                })
            });

            const data = await response.json();
            console.log("RESPOSTA DENÚNCIA:", data);

            showConfirmationModal(
                "Denúncia registrada!",
                "Sua denúncia foi recebida com sucesso."
            );

            detailedReportFormElement.reset();
            charCount.textContent = '0';
            hideForms();

        } catch (error) {
            console.error(error);
            alert("Erro ao enviar denúncia");
        }
    }

    /* ================= EVENTOS ================= */
    emergencyTrigger.addEventListener('click', () => {
        hideForms();
        emergencyForm.style.display = 'block';
    });

    reportTrigger.addEventListener('click', () => {
        hideForms();
        detailedReportForm.style.display = 'block';
    });

    cancelEmergency.addEventListener('click', hideForms);
    cancelReport.addEventListener('click', hideForms);
    getLocationBtn.addEventListener('click', getCurrentLocation);

    immediateAlertForm.addEventListener('submit', handleEmergencySubmit);
    detailedReportFormElement.addEventListener('submit', handleReportSubmit);

    reportDescription.addEventListener('input', () => {
        charCount.textContent = reportDescription.value.length;
    });

    toggleAgressorInfo.addEventListener('click', () => {
        agressorInfoForm.style.display =
            agressorInfoForm.style.display === 'none' ? 'block' : 'none';
    });

});
