import React from "react";
import { jsPDF } from "jspdf";
import style from "../style/DownloadPdf.module.css"
//  import html2canvas from 'html2canvas';

export default function DownloadPdf() {

  // eslint-disable-next-line new-cap
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [4, 2]
  });

  const content = document.getElementById('pdf-content');

  if (content) {
    pdf.html(content, {
      callback: (doc) => doc.save('component.pdf'),
      x: 10,
      y: 10,
      html2canvas: { scale: 2 },
    });
  }

  function getPdf() {
    doc.text("recipeDoc", 1, 1);
    doc.save("two-by-four.pdf");
  }

  return (
    <button className={style.pdf} onClick={getPdf} title="Click here to download a PDF of this recipe." type="button">Download</button>
  )
}