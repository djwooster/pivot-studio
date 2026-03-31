// PDF generation is handled in the API route via @react-pdf/renderer.
// This file re-exports the helper to keep the API route clean.

export { generatePdfBuffer } from '@/components/audit/pdf/ReportDocument'
