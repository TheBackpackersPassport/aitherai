// Set today's date as default
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
    
    // Set due date to 30 days from today
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];
    
    // Generate default invoice number
    const invoiceNum = 'INV-' + Date.now().toString().slice(-6);
    document.getElementById('invoiceNumber').value = invoiceNum;
    
    // Add event listeners for service calculations
    attachServiceListeners();
});

// Add new service line
function addService() {
    const container = document.getElementById('servicesContainer');
    const serviceItem = document.createElement('div');
    serviceItem.className = 'service-item';
    serviceItem.innerHTML = `
        <div class="form-row">
            <div class="form-group flex-3">
                <label>Description</label>
                <input type="text" class="service-description" placeholder="Service description">
            </div>
            <div class="form-group">
                <label>Quantity</label>
                <input type="number" class="service-quantity" value="1" min="1">
            </div>
            <div class="form-group">
                <label>Rate ($)</label>
                <input type="number" class="service-rate" placeholder="0.00" step="0.01">
            </div>
            <div class="form-group">
                <label>Amount ($)</label>
                <input type="number" class="service-amount" readonly>
            </div>
            <button type="button" class="remove-service" onclick="removeService(this)">×</button>
        </div>
    `;
    container.appendChild(serviceItem);
    attachServiceListeners();
}

// Remove service line
function removeService(button) {
    button.closest('.service-item').remove();
    calculateTotals();
}

// Attach event listeners to service inputs
function attachServiceListeners() {
    const quantities = document.querySelectorAll('.service-quantity');
    const rates = document.querySelectorAll('.service-rate');
    
    quantities.forEach(input => {
        input.removeEventListener('input', calculateServiceAmount);
        input.addEventListener('input', calculateServiceAmount);
    });
    
    rates.forEach(input => {
        input.removeEventListener('input', calculateServiceAmount);
        input.addEventListener('input', calculateServiceAmount);
    });
}

// Calculate service amount
function calculateServiceAmount(event) {
    const serviceItem = event.target.closest('.service-item');
    const quantity = parseFloat(serviceItem.querySelector('.service-quantity').value) || 0;
    const rate = parseFloat(serviceItem.querySelector('.service-rate').value) || 0;
    const amount = quantity * rate;
    serviceItem.querySelector('.service-amount').value = amount.toFixed(2);
    calculateTotals();
}

// Calculate totals
function calculateTotals() {
    const amounts = document.querySelectorAll('.service-amount');
    let subtotal = 0;
    
    amounts.forEach(input => {
        subtotal += parseFloat(input.value) || 0;
    });
    
    const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;
    
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('taxAmount').textContent = '$' + taxAmount.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

// Generate Invoice
function generateInvoice() {
    // Validate required fields
    const clientName = document.getElementById('clientName').value;
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    
    if (!clientName || !invoiceNumber) {
        alert('Please fill in required fields: Invoice Number and Client Name');
        return;
    }
    
    // Check if at least one service is added
    const services = document.querySelectorAll('.service-description');
    let hasValidService = false;
    services.forEach(service => {
        if (service.value.trim() !== '') {
            hasValidService = true;
        }
    });
    
    if (!hasValidService) {
        alert('Please add at least one service');
        return;
    }
    
    // Generate invoice HTML
    const invoiceHTML = generateInvoiceHTML();
    document.getElementById('invoiceContent').innerHTML = invoiceHTML;
    
    // Show preview, hide form
    document.querySelector('.invoice-form').style.display = 'none';
    document.getElementById('invoicePreview').classList.remove('hidden');
    
    // Scroll to preview
    document.getElementById('invoicePreview').scrollIntoView({ behavior: 'smooth' });
}

// Generate Invoice HTML
function generateInvoiceHTML() {
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const invoiceDate = formatDate(document.getElementById('invoiceDate').value);
    const dueDate = formatDate(document.getElementById('dueDate').value);
    const clientName = document.getElementById('clientName').value;
    const clientCompany = document.getElementById('clientCompany').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const clientAddress = document.getElementById('clientAddress').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const paymentTerms = document.getElementById('paymentTerms').value;
    const notes = document.getElementById('notes').value;
    
    // Get services
    let servicesHTML = '';
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        const description = item.querySelector('.service-description').value;
        const quantity = item.querySelector('.service-quantity').value;
        const rate = parseFloat(item.querySelector('.service-rate').value).toFixed(2);
        const amount = parseFloat(item.querySelector('.service-amount').value).toFixed(2);
        
        if (description) {
            servicesHTML += `
                <tr>
                    <td>${description}</td>
                    <td>${quantity}</td>
                    <td>$${rate}</td>
                    <td>$${amount}</td>
                </tr>
            `;
        }
    });
    
    const subtotal = document.getElementById('subtotal').textContent;
    const taxRate = document.getElementById('taxRate').value;
    const taxAmount = document.getElementById('taxAmount').textContent;
    const total = document.getElementById('total').textContent;
    
    return `
        <div class="invoice-header">
            <div class="invoice-logo">
                <img src="Images/Aitherai .dev.png" alt="Aitherai Logo">
            </div>
            <div class="invoice-title">
                <h1>INVOICE</h1>
                <p style="color: #8B5CF6; font-size: 1.2rem;">${invoiceNumber}</p>
            </div>
        </div>
        
        <div class="invoice-details">
            <div class="invoice-from">
                <h3>FROM</h3>
                <p><strong>Aitherai</strong></p>
                <p>Website Building Company</p>
                <p>Create Without Limits</p>
                <p>scott@aitherai.dev</p>
            </div>
            <div class="invoice-to">
                <h3>BILL TO</h3>
                <p><strong>${clientName}</strong></p>
                ${clientCompany ? `<p>${clientCompany}</p>` : ''}
                ${clientEmail ? `<p>${clientEmail}</p>` : ''}
                ${clientPhone ? `<p>${clientPhone}</p>` : ''}
                ${clientAddress ? `<p>${clientAddress.replace(/\n/g, '<br>')}</p>` : ''}
            </div>
        </div>
        
        <div class="invoice-meta">
            <div class="meta-item">
                <label>Invoice Date</label>
                <span>${invoiceDate}</span>
            </div>
            <div class="meta-item">
                <label>Due Date</label>
                <span>${dueDate}</span>
            </div>
            <div class="meta-item">
                <label>Status</label>
                <span style="color: #EF4444;">Pending</span>
            </div>
        </div>
        
        ${projectDescription ? `
        <div class="footer-section">
            <h4>Project Description</h4>
            <p>${projectDescription}</p>
        </div>
        ` : ''}
        
        <div class="invoice-table">
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${servicesHTML}
                </tbody>
            </table>
        </div>
        
        <div class="invoice-summary">
            <div class="summary-content">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>${subtotal}</span>
                </div>
                ${taxRate > 0 ? `
                <div class="summary-row">
                    <span>Tax (${taxRate}%):</span>
                    <span>${taxAmount}</span>
                </div>
                ` : ''}
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>${total}</span>
                </div>
            </div>
        </div>
        
        <div class="invoice-footer">
            ${paymentTerms ? `
            <div class="footer-section">
                <h4>Payment Terms</h4>
                <p>${paymentTerms}</p>
            </div>
            ` : ''}
            
            ${notes ? `
            <div class="footer-section">
                <h4>Notes</h4>
                <p>${notes}</p>
            </div>
            ` : ''}
            
            <div class="company-info">
                <p><strong>Aitherai - Create Without Limits</strong></p>
                <p>Custom Website Development | No Templates | Your Vision Brought to Life</p>
                <p>Thank you for your business!</p>
            </div>
        </div>
    `;
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Edit Invoice
function editInvoice() {
    document.querySelector('.invoice-form').style.display = 'block';
    document.getElementById('invoicePreview').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Print Invoice
function printInvoice() {
    window.print();
}

// Download PDF
function downloadPDF() {
    const element = document.getElementById('invoiceContent');
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    
    // Use html2canvas to capture the invoice as an image
    html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Calculate dimensions to fit on one page
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth * 25.4, pdfHeight / imgHeight * 25.4);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 5;
        
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`${invoiceNumber}_Aitherai_Invoice.pdf`);
    }).catch(error => {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    });
}

// Clear Form
function clearForm() {
    if (confirm('Are you sure you want to clear all form data?')) {
        document.getElementById('clientName').value = '';
        document.getElementById('clientCompany').value = '';
        document.getElementById('clientEmail').value = '';
        document.getElementById('clientPhone').value = '';
        document.getElementById('clientAddress').value = '';
        document.getElementById('projectDescription').value = '';
        document.getElementById('paymentTerms').value = '';
        document.getElementById('notes').value = '';
        document.getElementById('taxRate').value = '0';
        
        // Clear all services except the first one
        const servicesContainer = document.getElementById('servicesContainer');
        const services = servicesContainer.querySelectorAll('.service-item');
        services.forEach((service, index) => {
            if (index === 0) {
                service.querySelector('.service-description').value = '';
                service.querySelector('.service-quantity').value = '1';
                service.querySelector('.service-rate').value = '';
                service.querySelector('.service-amount').value = '';
            } else {
                service.remove();
            }
        });
        
        // Reset totals
        calculateTotals();
        
        // Generate new invoice number
        const invoiceNum = 'INV-' + Date.now().toString().slice(-6);
        document.getElementById('invoiceNumber').value = invoiceNum;
    }
}
