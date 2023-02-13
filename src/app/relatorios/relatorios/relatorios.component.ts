import { Tarefa } from './../../tarefa/tarefa';
import { TarefaService } from 'src/app/tarefa/tarefa.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import jsPDF from 'jspdf';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
})
export class RelatoriosComponent implements OnInit {
  tarefa: Tarefa = new Tarefa();
  tarefas = Array<Tarefa>();

  // @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {}

  // gerarPDF() {
  //   let doc = new jsPDF();

  //   doc.html(this.el.nativeElement, {
  //     callback: (doc) => {
  //       doc.output('dataurlnewwindow');
  //     },
  //   });
  // }

  //usando jspdf
  // todasTarefas() {
  //   this.tarefaService.listarTarefas().subscribe((response) => {
  //     this.tarefas = [...response];

  //     let headers = ['id', 'Tarefa', 'Descrição'];

  //     const doc = new jsPDF('p', 'mm', 'a4');

  //     this.tarefas.forEach((item) => {
  //       doc.cell(1, 1, 50, 25, `${item.nomeTarefa}`, 2, 'center');
  //     });

  //     doc.output('pdfobjectnewwindow');
  //   });
  // }

  //usando pdfmaker
  pdfMaker() {
    this.tarefaService.listarTarefas().subscribe((res) => {
      this.tarefas = [...res];

      // variável para inserir o detail do pdf
      const bodyDetail: any[][] = [];

      let i = 1;
      //para cada linha do corpo adicionar uma tarefa do array de tarefas
      for (let tarefa of this.tarefas) {
        //necessario inserir array 'rows' em outro array
        const rows = new Array();
        rows.push(i++);
        rows.push(tarefa.id);
        rows.push(tarefa.nomeTarefa);
        rows.push(tarefa.descricao);
        rows.push(tarefa.dataCadastro);

        bodyDetail.push(rows);
      }

      // this.tarefas.forEach((t) => {
      // console.log(t.nomeTarefa + ' - ' + t.dataCadastro);
      let documento: TDocumentDefinitions = {
        footer: function (currentPage, pageCount) {
          return currentPage.toString() + ' de ' + pageCount;
        },

        content: [
          {
            columns: [{ text: 'Relatório de Tarefas', style: 'header' }],
          },
          {
            style: 'tableExample',
            table: {
              heights: function (row) {
                return 30;
              },
              widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
              headerRows: 1,
              body: [
                [
                  { text: 'N°', style: 'tableHeader' },
                  { text: 'Identificador da tarefa', style: 'tableHeader' },
                  { text: 'Tarefa', style: 'tableHeader' },
                  { text: 'Descrição', style: 'tableHeader' },
                  { text: 'Cadastro', style: 'tableHeader' },
                ],
                ...bodyDetail,
                // [i++, t.nomeTarefa, t.descricao],
              ],
            },
            layout: 'lightHorizontalLines',
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 30],
            alignment: 'center',
          },
          tableHeader: {
            bold: true,
          },
        },
      };
      pdfMake.createPdf(documento).open();
    });
  }

  // gerarPDF() {
  //   const doc = new jsPDF();
  //   doc.setFontSize(30);
  //   doc.text('Tarefas', 35, 25);
  //   // doc.addImage('assets/icons/icon-512x512.png', 'PNG', 15, 40, 50, 50);

  //   for (let item of this.tarefas) {
  //     doc.setFontSize(12);
  //     doc.text('ID', 12, 25);
  //     doc.text('Nome', 12, 33);
  //     doc.text('Feito', 12, 41);
  //     // doc.text(item.id.toString(), 10, 20);
  //     doc.text(item.nomeTarefa, 12, 30);
  //   }

  //   doc.output('dataurlnewwindow');
  // }

  // gerarPDF() {
  //   const doc = new jsPDF();
  //   doc.text('Hello world!', 10, 10);
  //   doc.save('test.pdf');
  // }

  // gerarPDF() {
  //   const documento = new jsPDF();
  //   documento.setFont('Courier');
  //   // documento.addFont( 'bold' );
  //   documento.setFontSize(20);
  //   documento.text('Tarefas', 65, 15);

  //   // documento.setFillColor(50, 50, 50);
  //   // documento.rect(10, 20, 30, 8, 'FD');
  //   // documento.rect(10, 28, 30, 8, 'FD');
  //   // documento.rect(10, 36, 30, 8, 'FD');
  //   // documento.rect(40, 20, 160, 8, 's');
  //   // documento.rect(40, 28, 160, 8, 's');
  //   // documento.rect(40, 36, 160, 8, 's');

  //   documento.setFontSize(12);
  //   documento.setTextColor(255, 255, 255);
  //   documento.text('ID', 12, 25);
  //   documento.text('Nome', 12, 33);
  //   documento.text('Feito', 12, 41);

  //   // documento.setFontStyle('normal');
  //   documento.setTextColor(0, 0, 0);
  //   documento.text('001', 42, 25);
  //   documento.text("Notebook 14' i7 8GB 1TB", 42, 33);
  //   documento.text('R$ 2400,00', 42, 41);

  //   documento.output('dataurlnewwindow');
  // }
}
