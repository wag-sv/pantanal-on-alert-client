import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function AlertsReport(alerts: any) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const title = [
    {
      text: 'Alertas Enviados',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45], // left, top, right, bottom
    },
  ];

  const data = alerts.map((alert: any) => {
    const alertSentAt = new Date(alert.alertSentAt)
      .toLocaleString()
      .split(' ')[0];
    return [
      { text: alert.user.name, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: alert.user.cpf, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: alert.propertyCode, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: alertSentAt, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text: alert.emailAlert?.attempt1?.response?.includes('250')
          ? 'RECEBIDO'
          : alert.emailAlert?.attempt1?.response || '-',
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: alert.emailAlert?.attempt2?.response?.includes('250')
          ? 'RECEBIDO'
          : alert.emailAlert?.attempt2?.response || '-',
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: alert.smsAlert?.attempt1[0]?.situacao?.includes('OK')
          ? 'RECEBIDO'
          : alert.smsAlert?.attempt1[0]?.situacao || '-',
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
    ];
  });

  const content = [
    {
      table: {
        headerRows: 1,
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Nome', style: 'tableHeader', fontSize: 10 },
            { text: 'CPF ', style: 'tableHeader', fontSize: 10 },
            { text: 'Propriedade', style: 'tableHeader', fontSize: 10 },
            { text: 'Data', style: 'tableHeader', fontSize: 10 },
            { text: 'Email (tentativa 1)', style: 'tableHeader', fontSize: 10 },
            { text: 'Email (tentativa 2)', style: 'tableHeader', fontSize: 10 },
            { text: 'SMS', style: 'tableHeader', fontSize: 10 },
          ],
          ...data,
        ],
      },
      layout: 'lightHorizontalLines', // headerLineOnly
    },
  ];

  function footer(currentPage: any, pageCount: any) {
    return [
      {
        text: `${currentPage} / ${pageCount}`,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0], // left, top, right, bottom
      },
    ];
  }

  const docDefinitions: any = {
    info: {
      title: 'Alertas Enviados',
      author: 'Pantanal em Alerta',
      subject: 'Alertas Enviados',
      keywords: 'alertas pantanal queimadas incêndios',
    },
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: [30, 60, 20, 40],

    header: [title],
    content: [content],
    footer,
  };

  pdfMake.createPdf(docDefinitions).open();
}

export default AlertsReport;
