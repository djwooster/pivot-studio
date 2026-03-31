import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient }       from '@/lib/audit/supabase'
import { generatePdfBuffer }         from '@/lib/audit/pdf'
import type { AuditSubmission }      from '@/types/audit'

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('audit_submissions')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    const submission = data as AuditSubmission
    const buffer     = await generatePdfBuffer(submission)
    const filename   = `ai-readiness-report-${submission.company.toLowerCase().replace(/\s+/g, '-')}.pdf`

    // Upload to Supabase Storage (non-blocking — don't fail if storage errors)
    supabase.storage
      .from('audit-reports')
      .upload(`${id}.pdf`, buffer, { contentType: 'application/pdf', upsert: true })
      .then(({ data: uploadData }) => {
        if (uploadData) {
          const { data: publicData } = supabase.storage
            .from('audit-reports')
            .getPublicUrl(`${id}.pdf`)
          supabase
            .from('audit_submissions')
            .update({ pdf_url: publicData.publicUrl })
            .eq('id', id)
            .then(() => {})
        }
      })
      .catch(() => {})

    return new NextResponse(buffer.buffer as ArrayBuffer, {
      headers: {
        'Content-Type':        'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length':      buffer.byteLength.toString(),
      },
    })
  } catch (err) {
    console.error('PDF generation error:', err)
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}
