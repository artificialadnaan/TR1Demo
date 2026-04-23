import { motion } from 'motion/react';
import { ChevronRight, Download, FileCode, FileSpreadsheet, FileText, Clock, TrendingUp } from 'lucide-react';
import { damageItems, projectMeta, calcTotals } from '../data/scope';

interface EstimateScreenProps {
  onNext: () => void;
}

export default function EstimateScreen({ onNext }: EstimateScreenProps) {
  const totals = calcTotals();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-3.5rem)] bg-ink-50"
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500 mb-2">
              Estimate · Xactimate-Compatible Scope
            </div>
            <h1 className="font-display text-4xl font-bold text-ink-900 leading-tight">
              {projectMeta.claimNumber}
              <span className="text-safety-500">.</span>
            </h1>
            <div className="font-body text-sm text-ink-600 mt-1">
              {projectMeta.clientName} · {projectMeta.address}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ExportButton icon={FileCode} label=".ESX" sublabel="Xactimate native" />
            <ExportButton icon={FileSpreadsheet} label="CSV" sublabel="Spreadsheet" />
            <ExportButton icon={FileText} label="PDF" sublabel="Printable" />
            <button
              onClick={onNext}
              className="ml-2 bg-ink-900 text-ink-50 px-5 py-3 font-mono text-sm uppercase tracking-[0.15em] hover:bg-safety-500 hover:text-ink-900 transition-colors flex items-center gap-2"
            >
              Claim Package
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <KpiCard
            label="Line Items"
            value={damageItems.length.toString()}
            hint="11 roof/exterior · 1 HVAC"
          />
          <KpiCard
            label="RCV Total"
            value={`$${totals.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
            hint="Replacement Cost Value"
            accent="safety"
          />
          <KpiCard
            label="Time Saved"
            value="52 min"
            hint="vs manual Xactimate entry"
            icon={Clock}
            accent="field"
          />
          <KpiCard
            label="Confidence"
            value="92%"
            hint="10 high · 1 medium · 1 low"
            icon={TrendingUp}
          />
        </div>

        {/* Line items table */}
        <div className="bg-white border border-ink-200">
          <div className="grid grid-cols-[60px_1fr_120px_80px_60px_110px_110px_130px] px-5 py-3 border-b border-ink-200 bg-ink-50 font-mono text-[10px] uppercase tracking-wider text-ink-500">
            <div>Item</div>
            <div>Description</div>
            <div>Code</div>
            <div className="text-right">Qty</div>
            <div className="text-right">Unit</div>
            <div className="text-right">Unit $</div>
            <div className="text-right">Labor $</div>
            <div className="text-right">Extension</div>
          </div>

          {damageItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="grid grid-cols-[60px_1fr_120px_80px_60px_110px_110px_130px] px-5 py-3 border-b border-ink-100 hover:bg-ink-50 transition-colors items-center"
            >
              <div className="font-mono text-xs text-ink-500">{item.id}</div>
              <div>
                <div className="font-body text-sm text-ink-900 font-medium leading-snug">
                  {item.description}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mt-0.5">
                  {item.location}
                </div>
              </div>
              <div className="font-mono text-xs font-semibold text-ink-900">
                {item.xactimateCode}
              </div>
              <div className="font-mono text-sm text-ink-900 tabular text-right">
                {item.quantity.toLocaleString()}
              </div>
              <div className="font-mono text-xs text-ink-600 text-right">{item.unit}</div>
              <div className="font-mono text-sm text-ink-900 tabular text-right">
                ${item.unitPrice.toFixed(2)}
              </div>
              <div className="font-mono text-sm text-ink-900 tabular text-right">
                ${item.laborPrice.toFixed(2)}
              </div>
              <div className="font-mono text-sm text-ink-900 font-semibold tabular text-right">
                ${(item.quantity * (item.unitPrice + item.laborPrice)).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </motion.div>
          ))}

          {/* Totals footer */}
          <div className="bg-ink-50 border-t-2 border-ink-900">
            <TotalRow label="Subtotal" value={totals.subtotal} />
            <TotalRow label="Overhead (10%)" value={totals.overhead} />
            <TotalRow label="Profit (10%)" value={totals.profit} />
            <TotalRow label="Sales Tax (8.25%)" value={totals.tax} />
            <div className="grid grid-cols-[1fr_auto] px-5 py-5 bg-ink-900 text-ink-50 items-baseline">
              <div className="font-display text-xl font-bold uppercase tracking-wide">
                Total RCV
              </div>
              <div className="font-display text-3xl font-bold tabular">
                ${totals.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-6 p-4 bg-white border border-ink-200 border-l-4 border-l-safety-500">
          <div className="font-mono text-[10px] uppercase tracking-widest text-safety-600 mb-1">
            Pricing Basis
          </div>
          <div className="font-body text-[13px] text-ink-700 leading-relaxed">
            Line-item pricing represents regional market rates for Oklahoma City, OK (ZIP 73142) as of April 2026. On export to <strong>.esx</strong>, your Xactimate seat will re-price against current published rates using your configured O&P and tax settings. Line items with {"<"}90% confidence are flagged for adjuster review in the .esx export notes field.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExportButton({ icon: Icon, label, sublabel }: { icon: typeof FileCode; label: string; sublabel: string }) {
  return (
    <button className="group bg-white border border-ink-200 hover:border-ink-900 hover:bg-ink-900 hover:text-ink-50 transition-colors px-3 py-2 flex items-center gap-2.5 min-w-[100px]">
      <Icon className="w-4 h-4" />
      <div className="text-left">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-wider leading-none">
          {label}
        </div>
        <div className="font-mono text-[9px] text-ink-500 group-hover:text-ink-300 uppercase tracking-wider mt-0.5">
          {sublabel}
        </div>
      </div>
      <Download className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
    </button>
  );
}

function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  icon?: typeof Clock;
  accent?: 'safety' | 'field';
}) {
  return (
    <div className={`
      bg-white border border-ink-200 p-4
      ${accent === 'safety' ? 'border-l-4 border-l-safety-500' : ''}
      ${accent === 'field' ? 'border-l-4 border-l-field-500' : ''}
    `}>
      <div className="flex items-start justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
          {label}
        </div>
        {Icon && <Icon className="w-4 h-4 text-ink-400" />}
      </div>
      <div className="font-display text-3xl font-bold text-ink-900 tabular mt-1">
        {value}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mt-1">
        {hint}
      </div>
    </div>
  );
}

function TotalRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[1fr_auto] px-5 py-2.5 border-b border-ink-200 items-baseline">
      <div className="font-body text-sm text-ink-700 text-right pr-6">{label}</div>
      <div className="font-mono text-sm font-semibold text-ink-900 tabular min-w-[130px] text-right">
        ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>
  );
}
