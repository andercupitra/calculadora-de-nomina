function addEmployee() {
    const employeeFields = document.getElementById('employee-fields');
    const newEmployeeForm = document.createElement('div');
    newEmployeeForm.className = 'employee-form';
    newEmployeeForm.innerHTML = `
        <div class="form-row">
            <div class="form-group col-md-3">
                <label for="employee-name">Nombre del Empleado:</label>
                <input type="text" class="form-control" required>
            </div>
            <div class="form-group col-md-2">
                <label for="hourly-rate">Salario por Hora:</label>
                <input type="number" class="form-control" step="0.01" required>
            </div>
            <div class="form-group col-md-2">
                <label for="hours-worked">Horas Trabajadas:</label>
                <input type="number" class="form-control" required>
            </div>
            <div class="form-group col-md-2">
                <label for="tax-rate">Tasa de Impuestos (%):</label>
                <input type="number" class="form-control" step="0.01" required>
            </div>
            <div class="form-group col-md-3">
                <label for="deductions">Deducciones:</label>
                <input type="number" class="form-control" step="0.01" required>
            </div>
        </div>
    `;
    employeeFields.appendChild(newEmployeeForm);
}

function generatePayroll() {
    const employeeForms = document.querySelectorAll('.employee-form');
    let totalPayroll = 0;
    let resultHTML = '<h3>Detalle de Nómina:</h3>';

    employeeForms.forEach((form, index) => {
        const employeeName = form.querySelector('[type="text"]').value;
        const hourlyRate = parseFloat(form.querySelector('[type="number"]').value);
        const hoursWorked = parseFloat(form.querySelectorAll('[type="number"]')[1].value);
        const taxRate = parseFloat(form.querySelectorAll('[type="number"]')[2].value);
        const deductions = parseFloat(form.querySelectorAll('[type="number"]')[3].value);

        if (isNaN(hourlyRate) || isNaN(hoursWorked) || isNaN(taxRate) || isNaN(deductions)) {
            alert(`Por favor, ingrese datos válidos para el empleado ${index + 1}`);
            return;
        }

        const grossPay = hourlyRate * hoursWorked;
        const taxAmount = (taxRate / 100) * grossPay;
        const netPay = grossPay - taxAmount - deductions;
        totalPayroll += netPay;

        resultHTML += `
            <p>
                <strong>Empleado:</strong> ${employeeName}<br>
                <strong>Salario Bruto:</strong> $${grossPay.toFixed(2)}<br>
                <strong>Impuestos:</strong> $${taxAmount.toFixed(2)}<br>
                <strong>Deducciones:</strong> $${deductions.toFixed(2)}<br>
                <strong>Salario Neto:</strong> $${netPay.toFixed(2)}
            </p>
            <hr>
        `;
    });

    resultHTML += `<h4>Total a Pagar: $${totalPayroll.toFixed(2)}</h4>`;
    document.getElementById('result').innerHTML = resultHTML;
}
