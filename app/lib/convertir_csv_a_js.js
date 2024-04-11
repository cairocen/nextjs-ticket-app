const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');

const combinedData = [];

fs.createReadStream('./app/lib/centros_educativos.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
        const valorServicioStr = row['VALOR SERVICIO MES'];
        const valorServicio = valorServicioStr ? parseFloat(valorServicioStr.replace(',', '').replace('.', '').replace(',', '.')) / 100 : 0;
        const combinedRow = {
            id: uuidv4(),
            lot: row.LOTE,
            site_code: row['CODIGO SACE'], // Cambio de 'siteCode' a 'site_code'
            site_name: row['NOMBRE SITIO'], // Cambio de 'siteName' a 'site_name'
            site_type: 'Centro Educativo',
            department: row.DEPARTAMENTO,
            municipality: row.MUNICIPIO,
            village: row.ALDEA,
            bandwidth: row['ANCHO DE BANDA (MBPS)'],
            service_value: valorServicio, // Cambio de 'serviceValue' a 'service_value'
            contact_name: row['NOMBRE CONTACTO'] || '', // Cambio de 'contactName' a 'contact_name'
            contact_phone: row['TELEFONO CONTACTO'] || '', // Cambio de 'contactPhone' a 'contact_phone'
            contract_number: 'DIGER-AGEHRED-013-2023'
        };
        combinedData.push(combinedRow);
    })
    .on('end', () => {
        fs.createReadStream('./app/lib/centros_hospitalarios.csv')
            .pipe(csv({ separator: ';' }))
            .on('data', (row) => {
                const valorServicioStr = row['VALOR SERVICIO MES'];
                const valorServicio = valorServicioStr ? parseFloat(valorServicioStr.replace(',', '').replace('.', '').replace(',', '.')) / 100 : 0;
                const combinedRow = {
                    id: uuidv4(),
                    lot: row.LOTE,
                    site_code: row.CODIGO, // Cambio de 'siteCode' a 'site_code'
                    site_name: row['NOMBRE SITIO'], // Cambio de 'siteName' a 'site_name'
                    site_type: 'Centro Hospitalario',
                    department: row.DEPARTAMENTO,
                    municipality: row.MUNICIPIO,
                    village: '',
                    bandwidth: row['ANCHO DE BANDA (MBPS)'],
                    service_value: valorServicio, // Cambio de 'serviceValue' a 'service_value'
                    contact_name: row['NOMBRE CONTACTO'] || '', // Cambio de 'contactName' a 'contact_name'
                    contact_phone: row['TELEFONO CONTACTO'] || '', // Cambio de 'contactPhone' a 'contact_phone'
                    contract_number: 'DIGER-AGEHRED-013-2023'
                };
                combinedData.push(combinedRow);
            })
            .on('end', () => {
                const formattedSitios = JSON.stringify(combinedData, null, 2)
                    .replace(/"([a-zA-Z_]+)":/g, '$1:'); // Remover comillas de las claves, incluyendo guiones bajos

                const jsData = `const sitios = ${formattedSitios}`;

                fs.writeFile('sitios.js', jsData, (err) => {
                    if (err) throw err;
                    console.log('Archivo JavaScript generado con éxito');
                });
            });
    });