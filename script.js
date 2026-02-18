// Constants
const DEFAULT_ROWS = 15;
let CLIENTS_DB = [];

// State
let currentClient = null;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Set Default Dates
    const today = new Date();
    // Default Issue Date
    document.getElementById('issueDate').value = today.toLocaleDateString('es-CO', { timeZone: 'America/Bogota', day: '2-digit', month: '2-digit', year: 'numeric' });

    // Default Due Date (Same or +30?) - Let's leave empty or same
    // document.getElementById('dueDate').value = ...

    // Generate Table Rows
    renderRows();

    // Load Clients
    try {
        const response = await fetch('clientes.json');
        if (response.ok) {
            CLIENTS_DB = await response.json();
            console.log("Clients loaded:", CLIENTS_DB.length);
        } else {
            console.warn("clients.json found but returned status:", response.status);
            CLIENTS_DB = [];
        }
    } catch (e) {
        console.error("Could not load clients.json", e);
        CLIENTS_DB = [];
    }

    // Initialize Grand Total
    calculateTotal();
});

function renderRows() {
    const tbody = document.getElementById('itemsTableBody');
    tbody.innerHTML = '';

    for (let i = 0; i < DEFAULT_ROWS; i++) {
        const tr = document.createElement('tr');
        tr.className = 'item-row';
        tr.innerHTML = `
            <td>
                <input type="number" class="text-center item-qty" oninput="calculateRow(${i})">
            </td>
            <td>
                <input type="text" class="item-desc">
            </td>
            <td>
                <input type="number" class="text-right item-unit" oninput="calculateRow(${i})">
            </td>
            <td>
                <input type="text" class="text-right item-total" readonly>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

// Calculations
function calculateRow(index) {
    const rows = document.querySelectorAll('#itemsTableBody tr');
    const row = rows[index];
    const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
    const unit = parseFloat(row.querySelector('.item-unit').value) || 0;
    const totalInput = row.querySelector('.item-total');

    const total = qty * unit;
    if (total > 0) {
        totalInput.value = formatCurrency(total);
    } else {
        totalInput.value = '';
    }
    calculateTotal();
}

function calculateTotal() {
    let sumItems = 0;
    document.querySelectorAll('.item-total').forEach(input => {
        const val = parseCurrency(input.value);
        sumItems += val;
    });

    const labor = parseCurrency(document.getElementById('laborCost').value);
    const material = parseCurrency(document.getElementById('materialCost').value);

    const grandTotal = sumItems + labor + material;
    document.getElementById('grandTotal').value = formatCurrency(grandTotal);
}

// Utilities
function formatCurrency(number) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

function parseCurrency(str) {
    if (!str) return 0;
    // Remove everything that is NOT a digit or a minus sign (though price usually positive)
    return parseInt(str.toString().replace(/\D/g, ''), 10) || 0;
}

function formatCurrencyInput(input) {
    const val = parseCurrency(input.value);
    if (val === 0 && input.value === '') return;

    // logic to allow typing: only format on blur or be careful?
    // simple approach: always format (might be annoying while typing)
    // improved:
    input.value = formatCurrency(val);
}

// Client Search
function filterClients() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const div = document.getElementById('searchResults');
    div.innerHTML = '';

    let filtered = [];
    if (!filter) {
        filtered = CLIENTS_DB;
    } else {
        filtered = CLIENTS_DB.filter(c =>
            (c.name && c.name.toLowerCase().includes(filter)) ||
            (c.nit && c.nit.toLowerCase().includes(filter))
        );
    }

    if (filtered.length > 0) {
        filtered.forEach(c => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = `<b>${c.name}</b><br>${c.nit}`;
            item.onclick = () => selectClient(c);
            document.getElementById('searchResults').appendChild(item); // Append to DOM
            div.appendChild(item);
        });
        div.style.display = 'block';
    } else {
        div.style.display = 'none';
    }
}

function showResults() {
    filterClients();
    document.getElementById('searchResults').style.display = 'block';
}

function hideResults() {
    setTimeout(() => {
        document.getElementById('searchResults').style.display = 'none';
    }, 200);
}

function selectClient(client) {
    currentClient = client;
    document.getElementById('clientName').value = client.name || '';
    document.getElementById('clientNit').value = client.nit || '';
    document.getElementById('clientAddress').value = client.address || '';
    if (client.phone) document.getElementById('clientPhone').value = client.phone;

    document.getElementById('searchInput').value = client.name;
    document.getElementById('searchResults').style.display = 'none';

    // Auto-generate Filename prefix or something if needed
}

function handleClear() {
    // Clear Inputs
    document.querySelectorAll('input').forEach(i => {
        // Keep Date and Invoice Number
        if (i.id !== 'issueDate' && i.id !== 'invoiceNumber' && i.id !== 'searchInput') i.value = '';
    });

    // Reset Total Rows
    renderRows();

    // Clear Client
    currentClient = null;
    document.getElementById('searchInput').value = '';

    // Clear Textareas
    // document.getElementById('observations').value = DEFAULT_OBSERVATIONS; // Keep default if static?

    // Recalc
    calculateTotal();
}

// PDF Generation
async function handleDownloadPDF() {
    const element = document.getElementById('invoice-content');
    const invoiceNumber = document.getElementById('invoiceNumber').value || '0000';
    let fileName = `Factura_${invoiceNumber}`;

    if (currentClient && currentClient.sname) {
        fileName = `${currentClient.sname}_${invoiceNumber}`;
    }

    const opt = {
        margin: 0,
        filename: `${fileName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        // 1. Generate Invoice PDF
        // @ts-ignore
        const invoicePdfBytes = await html2pdf().set(opt).from(element).outputPdf('arraybuffer');

        // 2. Load "Seguridad Social" PDF (Static File) from PDFLib (window.PDFLib)
        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.create();

        // Embed Invoice
        const invoicePdf = await PDFDocument.load(invoicePdfBytes);
        const invoicePages = await pdfDoc.copyPages(invoicePdf, invoicePdf.getPageIndices());
        invoicePages.forEach((page) => pdfDoc.addPage(page));

        // Embed Static Security Social
        try {
            console.log("Fetching seguridad_social.pdf...");
            const res = await fetch('seguridad_social.pdf');
            if (res.ok) {
                const ssBytes = await res.arrayBuffer();
                const ssPdf = await PDFDocument.load(ssBytes);
                // Check if it's a valid PDF (has pages)
                if (ssPdf.getPageCount() > 0) {
                    const ssPages = await pdfDoc.copyPages(ssPdf, ssPdf.getPageIndices());
                    ssPages.forEach((page) => pdfDoc.addPage(page));
                    console.log("Merged seguridad_social.pdf successfully.");
                }
            } else {
                console.warn("seguridad_social.pdf not found or readable (Status: " + res.status + ")");
            }
        } catch (e) {
            console.error("Error loading/merging seguridad_social.pdf", e);
        }

        // 3. Save
        const pdfBytes = await pdfDoc.save();

        // 4. Download
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Ocurrió un error al generar el PDF: " + error.message);
    }
}
