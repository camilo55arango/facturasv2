// Constants
const DEFAULT_ROWS = 15;
const SEGURIDAD_SOCIAL_BASE64 = "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IDAgb2JqCjw8L0Rlc3RzIDggMCBSPj4KZW5kb2JqCjEwIDAgb2JqCjw8L05hbWVzIDkgMCBSL1R5cGUvQ2F0YWxvZy9QYWdlcyA2IDAgUi9WaWV3ZXJQcmVmZXJlbmNlczw8L1ByaW50U2NhbGluZy9BcHBEZWZhdWx0Pj4+PgplbmRvYmoKMTEgMCBvYmoKPDwvTW9kRGF0ZShEOjIwMjYwMTI3MDYzMDE4LTA1JzAwJykvQ3JlYXRvcihKYXNwZXJSZXBvcnRzIExpYnJhcnkgdmVyc2lvbiBudWxsKS9DcmVhdGlvbkRhdGUoRDoyMDI2MDEyNzA2MzAxOC0wNScwMCcpL1Byb2R1Y2VyKGlUZXh0IDIuMS43IGJ5IDFUM1hUKT4+CmVuZG9iagp4cmVmCjAgMTIKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDEzODc0IDAwMDAwIG4gCjAwMDAwMTQxOTQgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAyMDY2IDAwMDAwIG4gCjAwMDAwMDUzODMgMDAwMDAgbiAKMDAwMDAxNDI4MiAwMDAwMCBuIAowMDAwMDE0MTU5IDAwMDAwIG4gCjAwMDAwMTQzNDUgMDAwMDAgbiAKMDAwMDAxNDM5OSAwMDAwMCBuIAowMDAwMDE0NDMxIDAwMDAwIG4gCjAwMDAwMTQ1MzUgMDAwMDAgbiAKdHJhaWxlcgo8PC9JbmZvIDExIDAgUi9JRCBbPDVkOGJjZGZmYmM3Y2VjOTk0NTZlNDMxNDQxNjZhNDIzPjw4OGZkNTRiMzQ4NzczNTFmZmFhZTBlZWY2OWE2MmIyZD5dL1Jvb3QgMTAgMCBSL1NpemUgMTI+PgpzdGFydHhyZWYKMTQ3MDIKJSVFT0YK";

// Client Database (Inlined to avoid CORS issues)
const CLIENTS_DB = [
    {
        "id": "1",
        "name": "Conjunto Residencial Bosque de San Jorge",
        "sname": "San_Jorge",
        "nit": "900320049-8",
        "address": "Carrera 27c #23 sur 152"
    },
    {
        "id": "2",
        "name": "Cantagirone Trepiu",
        "sname": "Cantagirone_Trepiu",
        "nit": "901222311-7",
        "address": "Calle 16 sur # 20-65"
    },
    {
        "id": "3",
        "name": "Urbanización Akacia P.H",
        "sname": "Akacia",
        "nit": "900357037-1",
        "address": "Carrera 27 #23 sur 101"
    },
    {
        "id": "4",
        "name": "Condominio Encenillo de la Calleja",
        "sname": "Encenillo_Calleja",
        "nit": "901392648-1",
        "address": "Calle 36 sur # 23A - 12"
    },
    {
        "id": "5",
        "name": "Condominio Arandano de la Calleja",
        "sname": "Arandano",
        "nit": "900915804-7",
        "address": "Carrera 23A # 26 sur 02"
    },
    {
        "id": "6",
        "name": "Condominio Olivo de la Calleja P.H",
        "sname": "Olivo_Calleja",
        "nit": "900899493-0",
        "address": "Calle 26 sur # 23A - 04"
    },
    {
        "id": "7",
        "name": "Edificio Torre Valquiria",
        "sname": "Torre_Vaquiria",
        "nit": "811001930-1",
        "address": "Calle 9B # 25 - 20"
    },
    {
        "id": "8",
        "name": "Casas de Andalucia",
        "sname": "CasasAndalucia",
        "nit": "9011388561",
        "address": "Calle 23 sur # 15 - 50"
    },
    {
        "id": "9",
        "name": "Urbanización Hacienda San José",
        "sname": "Hacienda_San_Jose",
        "nit": "900305790-5",
        "address": "Carrera 20 # 22A - 30"
    },
        {
        "id": "10",
        "name": "Condominio Avellano de la Calleja",
        "sname": "Avellano",
        "nit": "901334059-6",
        "address": "Carrera 23A # 25 sur - 30"
    }
];

// State
let currentClient = null;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Set Default Dates
    const today = new Date();
    // Default Issue Date
    document.getElementById('issueDate').value = today.toLocaleDateString('es-CO', { timeZone: 'America/Bogota', day: '2-digit', month: '2-digit', year: 'numeric' });

    // Generate Table Rows
    renderRows();

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
                <input type="text" class="text-right item-total" oninput="formatCurrencyInput(this); calculateTotal();">
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
    // Items sum is NOT included in Grand Total as per user request
    const labor = parseCurrency(document.getElementById('laborCost').value);
    const material = parseCurrency(document.getElementById('materialCost').value);

    // Only Labor + Material
    const grandTotal = labor + material;
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

// File Upload Variable
let uploadedSecurityPdfBase64 = null;

// Handle File Selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('fileName').textContent = file.name;
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedSecurityPdfBase64 = e.target.result; // Data URL
        };
        reader.readAsDataURL(file);
    }
}

// Toggle handling
function toggleMergeSecurity(value) {
    const hiddenInput = document.getElementById('mergeSecurityValue');
    hiddenInput.value = value;

    const btnYes = document.getElementById('btnMergeYes');
    const btnNo = document.getElementById('btnMergeNo');
    const uploadContainer = document.getElementById('uploadContainer');

    if (value === 'si') {
        btnYes.classList.add('selected');
        btnNo.classList.remove('selected');
        if (uploadContainer) uploadContainer.style.display = 'block';
    } else {
        btnNo.classList.add('selected');
        btnYes.classList.remove('selected');
        if (uploadContainer) uploadContainer.style.display = 'none';
    }
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
        // hack: temporarily fix letter spacing for html2canvas
        const invoiceInput = document.getElementById('invoiceNumber');
        const originalSpacing = invoiceInput.style.letterSpacing;
        const originalIndent = invoiceInput.style.textIndent;
        const originalPaddingLeft = invoiceInput.style.paddingLeft;

        // Force spacing and padding for PDF centering (html2canvas handles padding better than text-indent for inputs)
        invoiceInput.style.letterSpacing = '5px';
        invoiceInput.style.textIndent = '0px';
        invoiceInput.style.paddingLeft = '5px';

        // @ts-ignore
        const invoicePdfBytes = await html2pdf().set(opt).from(element).outputPdf('arraybuffer');

        // Revert styles
        invoiceInput.style.letterSpacing = originalSpacing;
        invoiceInput.style.textIndent = originalIndent;
        invoiceInput.style.paddingLeft = originalPaddingLeft;

        let finalPdfBytes = invoicePdfBytes;

        // 2. Load "Seguridad Social" PDF (Static File) from PDFLib (window.PDFLib)
        const mergeOption = document.getElementById('mergeSecurityValue').value || 'no';

        try {
            const { PDFDocument } = PDFLib;
            const pdfDoc = await PDFDocument.create();

            // Embed Invoice
            const invoicePdf = await PDFDocument.load(invoicePdfBytes);
            const invoicePages = await pdfDoc.copyPages(invoicePdf, invoicePdf.getPageIndices());
            invoicePages.forEach((page) => pdfDoc.addPage(page));

            // Embed Static Security Social ONLY if selected
            if (mergeOption === 'si') {
                try {
                    let ssBytes = null;

                    // 1. Priority: User Uploaded File
                    if (uploadedSecurityPdfBase64) {
                        console.log("Using manually uploaded file...");
                        ssBytes = uploadedSecurityPdfBase64;
                    }

                    // 2. Priority: Fetch from Local File (Works with Server)
                    if (!ssBytes) {
                        try {
                            console.log("Attempting to fetch seguridad_social.pdf...");
                            const res = await fetch('seguridad_social.pdf');
                            if (res.ok) {
                                ssBytes = await res.arrayBuffer();
                                console.log("Successfully fetched seguridad_social.pdf");
                            } else {
                                console.warn("Fetch failed, status:", res.status);
                            }
                        } catch (fetchErr) {
                            console.warn("Fetch failed (likely CORS/No Server):", fetchErr);
                        }
                    }

                    // 3. Fallback: Embedded Base64
                    if (!ssBytes) {
                        console.log("Using embedded default PDF...");
                        ssBytes = SEGURIDAD_SOCIAL_BASE64;
                    }

                    // Load PDF
                    const ssPdf = await PDFDocument.load(ssBytes);

                    // Check if it's a valid PDF (has pages)
                    if (ssPdf.getPageCount() > 0) {
                        const ssPages = await pdfDoc.copyPages(ssPdf, ssPdf.getPageIndices());
                        ssPages.forEach((page) => pdfDoc.addPage(page));
                        console.log("Merged seguridad_social.pdf successfully.");
                        // Only save if merge successful - otherwise it will fall through to finalPdfBytes = invoicePdfBytes in catch
                        finalPdfBytes = await pdfDoc.save();
                    }

                } catch (e) {
                    console.warn("Could not merge seguridad_social.pdf.", e);
                    alert("Error al unir el PDF de Seguridad Social: " + e.message + "\n\nSe descargará solo la factura.\n\nIMPORTANTE: Si reemplazaste el archivo PDF, asegúrate de iniciar el servidor con 'iniciar.bat' o usa el botón 'Cambiar archivo PDF'.");
                }
            } else {
                console.log("User selected NOT to merge Security Social.");
                // If not merging, we still might want to save the doc as we created a new one, OR just use invoicePdfBytes
                // Actually, if we don't merge, pdfDoc only has invoice pages. 
                // Whatever, let's just set finalPdfBytes to invoicePdfBytes if 'no' is selected to be faster.
                finalPdfBytes = invoicePdfBytes;
            }
        } catch (pdfLibError) {
            console.error("PDFLib Error:", pdfLibError);
            alert("Error crítico en PDFLib: " + pdfLibError.message + "\n\nSe descargará solo la factura.");
            // Fallback to html2pdf output if PDFLib fails entirely
            finalPdfBytes = invoicePdfBytes;
        }

        // 3. Save
        const pdfBytes = finalPdfBytes;

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
