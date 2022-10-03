import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function EnrollmentProof(userName: any, cpf: any, propertyName: any, property: any, subscriptionDate: any) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const title: any = [];

  const content = [
    {
      text: 'Comprovante de Inscrição',
      style: 'title',
    },
    {
      text: `O Sistema Pantanal em Alerta registrou na data ${new Date(
        subscriptionDate,
      ).toLocaleString()} a inscrição do usuário ${userName} (CPF ${cpf}) para o recebimento de alertas de possíveis incêndios na propriedade com código CAR ${property}.`,
      style: 'body',
      bold: false,
      margin: [0, 50],
    },
    {
      text: `Comprovante gerado em ${new Date().toLocaleString()}.`,
      style: 'body',
      bold: false,
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
      title: 'Comprovante de Inscrição',
      author: 'Pantanal em Alerta',
      subject: 'Comprovante de Inscrição',
      keywords: 'comprovante inscrição',
    },
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [80, 100, 80, 50],

    styles: {
      title: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
      },
      body: {
        fontSize: 12,
        bold: true,
        alignment: 'justify',
      },
    },

    header: [title],
    content: [content],
    footer,
  };

  pdfMake.createPdf(docDefinitions).open();
}

export default EnrollmentProof;
