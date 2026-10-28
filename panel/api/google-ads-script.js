/**
 * ════════════════════════════════════════════════════════════════════════════
 *  INDICIO · Script de Google Ads → Google Sheets
 * ════════════════════════════════════════════════════════════════════════════
 *  Dónde se pega:  Google Ads → Herramientas → Acciones masivas →
 *                  Secuencias de comandos (Scripts) → botón "+" → pegar todo.
 *
 *  Qué hace:  Cada hora copia a tu Google Sheet los datos REALES de la cuenta:
 *    · ads_campanas   → estado de la campaña y POR QUÉ no se muestra (si aplica)
 *    · ads_diario     → impresiones, clics, gasto y conversiones por día (30 días)
 *    · ads_anuncios   → si los anuncios están aprobados / en revisión / rechazados
 *    · ads_keywords   → estado de cada palabra clave (p. ej. "bajo volumen")
 *    · ads_busquedas  → lo que la gente escribió realmente en Google
 *    · ads_meta       → fecha/hora de la última actualización
 *
 *  No necesita "developer token" ni servidor: Google lo ejecuta gratis.
 *  Programación recomendada: "Cada hora".
 * ════════════════════════════════════════════════════════════════════════════
 */

// ▸ PEGA AQUÍ la URL completa de tu Google Sheet (la misma donde está el Apps Script)
var SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/17dcgNS92GrjlIXGnrytsooA_IPpKL-25QDJv_XSYpQQ/edit?pli=1&gid=0#gid=0';

function main() {
  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);

  // ── 1. Campañas y su estado principal ──────────────────────────────────────
  escribir(ss, 'ads_campanas',
    ['campana', 'estado', 'estado_servicio', 'estado_principal', 'motivos', 'presupuesto_dia', 'puja', 'canal'],
    filas(
      "SELECT campaign.name, campaign.status, campaign.serving_status, campaign.primary_status, " +
      "campaign.primary_status_reasons, campaign_budget.amount_micros, campaign.bidding_strategy_type, " +
      "campaign.advertising_channel_type FROM campaign WHERE campaign.status != 'REMOVED'",
      function (r) {
        return [
          r.campaign.name, r.campaign.status, r.campaign.servingStatus, r.campaign.primaryStatus,
          (r.campaign.primaryStatusReasons || []).join(','),
          micros(r.campaignBudget && r.campaignBudget.amountMicros),
          r.campaign.biddingStrategyType, r.campaign.advertisingChannelType
        ];
      }));

  // ── 2. Métricas diarias de toda la cuenta (últimos 30 días) ───────────────
  escribir(ss, 'ads_diario',
    ['fecha', 'impresiones', 'clics', 'costo', 'conversiones'],
    filas(
      "SELECT segments.date, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions " +
      "FROM customer WHERE segments.date DURING LAST_30_DAYS ORDER BY segments.date",
      function (r) {
        return [r.segments.date, num(r.metrics.impressions), num(r.metrics.clicks),
                micros(r.metrics.costMicros), num(r.metrics.conversions)];
      }));

  // ── 3. Anuncios: aprobación de políticas ──────────────────────────────────
  escribir(ss, 'ads_anuncios',
    ['grupo', 'anuncio_id', 'estado', 'aprobacion', 'revision', 'calidad_anuncio'],
    filas(
      "SELECT ad_group.name, ad_group_ad.ad.id, ad_group_ad.status, ad_group_ad.policy_summary.approval_status, " +
      "ad_group_ad.policy_summary.review_status, ad_group_ad.ad_strength FROM ad_group_ad " +
      "WHERE ad_group_ad.status != 'REMOVED' AND campaign.status != 'REMOVED'",
      function (r) {
        var p = r.adGroupAd.policySummary || {};
        return [r.adGroup.name, r.adGroupAd.ad.id, r.adGroupAd.status, p.approvalStatus || '',
                p.reviewStatus || '', r.adGroupAd.adStrength || ''];
      }));

  // ── 4. Palabras clave: estado + métricas ──────────────────────────────────
  var metricasKw = {};
  filas(
    "SELECT ad_group.id, ad_group_criterion.criterion_id, metrics.impressions, metrics.clicks, metrics.cost_micros " +
    "FROM keyword_view WHERE segments.date DURING LAST_30_DAYS",
    function (r) {
      metricasKw[r.adGroup.id + '~' + r.adGroupCriterion.criterionId] =
        [num(r.metrics.impressions), num(r.metrics.clicks), micros(r.metrics.costMicros)];
      return null;
    });

  escribir(ss, 'ads_keywords',
    ['grupo', 'palabra', 'concordancia', 'estado', 'servicio', 'aprobacion', 'nivel_calidad', 'impresiones', 'clics', 'costo'],
    filas(
      "SELECT ad_group.id, ad_group.name, ad_group_criterion.criterion_id, ad_group_criterion.keyword.text, " +
      "ad_group_criterion.keyword.match_type, ad_group_criterion.status, ad_group_criterion.system_serving_status, " +
      "ad_group_criterion.approval_status, ad_group_criterion.quality_info.quality_score FROM ad_group_criterion " +
      "WHERE ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = FALSE " +
      "AND ad_group_criterion.status != 'REMOVED' AND campaign.status != 'REMOVED'",
      function (r) {
        var c = r.adGroupCriterion;
        var m = metricasKw[r.adGroup.id + '~' + c.criterionId] || [0, 0, 0];
        return [r.adGroup.name, c.keyword.text, c.keyword.matchType, c.status, c.systemServingStatus || '',
                c.approvalStatus || '', (c.qualityInfo && c.qualityInfo.qualityScore) || '', m[0], m[1], m[2]];
      }));

  // ── 5. Términos de búsqueda reales ────────────────────────────────────────
  escribir(ss, 'ads_busquedas',
    ['termino', 'impresiones', 'clics', 'costo'],
    filas(
      "SELECT search_term_view.search_term, metrics.impressions, metrics.clicks, metrics.cost_micros " +
      "FROM search_term_view WHERE segments.date DURING LAST_30_DAYS ORDER BY metrics.impressions DESC LIMIT 50",
      function (r) {
        return [r.searchTermView.searchTerm, num(r.metrics.impressions), num(r.metrics.clicks), micros(r.metrics.costMicros)];
      }));

  // ── 6. Marca de tiempo ────────────────────────────────────────────────────
  escribir(ss, 'ads_meta', ['clave', 'valor'], [
    ['actualizado', new Date().toISOString()],
    ['cuenta', AdsApp.currentAccount().getCustomerId()],
    ['moneda', AdsApp.currentAccount().getCurrencyCode()]
  ]);
}

/* ── Utilidades ─────────────────────────────────────────────────────────── */
function filas(query, mapFn) {
  var out = [];
  var it = AdsApp.search(query);
  while (it.hasNext()) {
    var fila = mapFn(it.next());
    if (fila) out.push(fila);
  }
  return out;
}

function escribir(ss, nombre, encabezados, datos) {
  var hoja = ss.getSheetByName(nombre) || ss.insertSheet(nombre);
  hoja.clearContents();
  var valores = [encabezados].concat(datos);
  hoja.getRange(1, 1, valores.length, encabezados.length).setValues(valores);
  hoja.setFrozenRows(1);
}

function micros(v) { return v ? Math.round(Number(v) / 10000) / 100 : 0; }
function num(v) { return v ? Number(v) : 0; }
