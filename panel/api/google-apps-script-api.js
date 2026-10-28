/**
 * ════════════════════════════════════════════════════════════════════════════
 *  INDICIO · Web App API (Google Apps Script)
 * ════════════════════════════════════════════════════════════════════════════
 *  Dónde se pega:
 *    1. Abre tu Google Sheet donde el script de Google Ads guardó los datos.
 *    2. En el menú superior ve a: Extensiones → Apps Script.
 *    3. Borra el código que haya y pega este archivo completo.
 *    4. Da clic en: Implementar (Deploy) → Nueva implementación.
 *    5. Tipo: "Aplicación web" (Web App).
 *    6. Configuración:
 *       - Ejecutar como: "Yo" (tu cuenta)
 *       - Quién tiene acceso: "Cualquier persona" (Anyone)
 *    7. Clic en "Implementar", autoriza permisos y COPIA la URL que te da.
 *       (Se ve como: https://script.google.com/macros/s/AKfycb.../exec)
 *    8. Pega esa URL en tu Panel Privado (panel/index.html) dando clic en
 *       "⚙️ Conectar API de Ads".
 *
 *  Listo: Tu panel leerá automáticamente métricas reales cada vez que abras.
 * ════════════════════════════════════════════════════════════════════════════
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var resultado = {
      ok: true,
      timestamp: new Date().toISOString(),
      cuenta: {},
      campana: null,
      metricas_totales: {
        impresiones: 0,
        clics: 0,
        costo: 0,
        conversiones: 0
      },
      diario: [],
      anuncios: [],
      keywords: [],
      busquedas: []
    };

    // 1. Meta
    var shMeta = ss.getSheetByName('ads_meta');
    if (shMeta) {
      var filasMeta = shMeta.getDataRange().getValues();
      for (var i = 1; i < filasMeta.length; i++) {
        resultado.cuenta[filasMeta[i][0]] = filasMeta[i][1];
      }
    }

    // 2. Campañas
    var shCamp = ss.getSheetByName('ads_campanas');
    if (shCamp) {
      var filasCamp = shCamp.getDataRange().getValues();
      if (filasCamp.length > 1) {
        var c = filasCamp[1];
        resultado.campana = {
          nombre: c[0],
          estado: c[1],
          estado_servicio: c[2],
          estado_principal: c[3],
          motivos: c[4] ? String(c[4]).split(',') : [],
          presupuesto_dia: Number(c[5]) || 0,
          estrategia_puja: c[6],
          canal: c[7]
        };
      }
    }

    // 3. Métricas Diarias
    var shDiario = ss.getSheetByName('ads_diario');
    if (shDiario) {
      var filasD = shDiario.getDataRange().getValues();
      for (var d = 1; d < filasD.length; d++) {
        var rowD = filasD[d];
        var item = {
          fecha: rowD[0],
          impresiones: Number(rowD[1]) || 0,
          clics: Number(rowD[2]) || 0,
          costo: Number(rowD[3]) || 0,
          conversiones: Number(rowD[4]) || 0
        };
        resultado.diario.push(item);
        resultado.metricas_totales.impresiones += item.impresiones;
        resultado.metricas_totales.clics += item.clics;
        resultado.metricas_totales.costo += item.costo;
        resultado.metricas_totales.conversiones += item.conversiones;
      }
      resultado.metricas_totales.costo = Math.round(resultado.metricas_totales.costo * 100) / 100;
    }

    // 4. Anuncios y estado de políticas
    var shAnuncios = ss.getSheetByName('ads_anuncios');
    if (shAnuncios) {
      var filasA = shAnuncios.getDataRange().getValues();
      for (var a = 1; a < filasA.length; a++) {
        var rowA = filasA[a];
        resultado.anuncios.push({
          grupo: rowA[0],
          id: rowA[1],
          estado: rowA[2],
          aprobacion: rowA[3],
          revision: rowA[4],
          calidad: rowA[5]
        });
      }
    }

    // 5. Palabras Clave
    var shKw = ss.getSheetByName('ads_keywords');
    if (shKw) {
      var filasK = shKw.getDataRange().getValues();
      for (var k = 1; k < filasK.length; k++) {
        var rowK = filasK[k];
        resultado.keywords.push({
          grupo: rowK[0],
          palabra: rowK[1],
          concordancia: rowK[2],
          estado: rowK[3],
          servicio: rowK[4],
          aprobacion: rowK[5],
          calidad: rowK[6],
          impresiones: Number(rowK[7]) || 0,
          clics: Number(rowK[8]) || 0,
          costo: Number(rowK[9]) || 0
        });
      }
    }

    // 6. Términos de búsqueda reales
    var shBusq = ss.getSheetByName('ads_busquedas');
    if (shBusq) {
      var filasB = shBusq.getDataRange().getValues();
      for (var b = 1; b < filasB.length; b++) {
        var rowB = filasB[b];
        resultado.busquedas.push({
          termino: rowB[0],
          impresiones: Number(rowB[1]) || 0,
          clics: Number(rowB[2]) || 0,
          costo: Number(rowB[3]) || 0
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify(resultado))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
