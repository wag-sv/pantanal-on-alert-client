import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import 'pdfmake/build/vfs_fonts';

if (!import.meta.env.PROD) {
  (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
}

export function UsersReport(users: any) {
  const title = [
    {
      text: 'Usuários Cadastrados',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45], // left, top, right, bottom
    },
  ];

  const data = users.map((user: any) => {
    const createdAt = new Date(user.createdAt).toLocaleString();
    return [
      { text: user.name, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: user.cpf, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text: user.isAdmin ? 'Administrador' : 'Padrão',
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      { text: createdAt, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: user.subscriptions.length, fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });

  const content = [
    {
      table: {
        headerRows: 1,
        widths: ['*', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Nome', style: 'tableHeader', fontSize: 10 },
            { text: 'CPF ', style: 'tableHeader', fontSize: 10 },
            { text: 'Tipo de Usuário', style: 'tableHeader', fontSize: 10 },
            { text: 'Cadastrador em', style: 'tableHeader', fontSize: 10 },
            { text: 'Inscrições', style: 'tableHeader', fontSize: 10 },
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
      title: 'Usuários Cadastrados',
      author: 'Pantanal em Alerta',
      subject: 'Usuários Cadastrados',
      keywords: 'usuários',
    },
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [30, 60, 20, 40],

    header: [title],
    content: [content],
    footer,
  };

  pdfMake.createPdf(docDefinitions, {}).open();
}
