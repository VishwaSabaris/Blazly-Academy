import { Award, Download, ExternalLink, QrCode } from "lucide-react";
import { courses } from "@/lib/courses";

const certificates = courses
  .filter((course) => course.progress === 100)
  .map((course, index) => ({
    id: `BLZ-${course.slug.toUpperCase().replace(/-/g, "-").slice(0, 8)}-${24817 + index}`,
    courseSlug: course.slug,
    title: course.title,
    issuedTo: "Alex",
    issuedAt: "Aug 2026",
    verified: true,
    gradient: course.gradient,
  }));

export default function CertificatesPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10 md:px-12 reveal is-visible">
      <div className="mb-10">
        <h1 className="mb-2 font-display text-[32px] font-bold tracking-tight text-ink drop-shadow-sm">
          Certificates
        </h1>
        <p className="text-[15px] text-muted">
          Download and share your verified Blazly Academy credentials.
        </p>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {certificates.map((certificate) => (
            <article
              key={certificate.id}
              className="overflow-hidden rounded-[24px] border border-line bg-paper-raised shadow-sm transition-all hover:border-emerald/30 hover:shadow-md"
            >
              <div className="border-b border-line bg-paper p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${certificate.gradient}`} />
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-emerald-deep">
                        Verified Certificate
                      </p>
                      <h2 className="font-display text-[20px] font-bold text-ink">
                        {certificate.title}
                      </h2>
                    </div>
                  </div>
                  <Award size={22} className="text-gold" />
                </div>

                <div className="rounded-2xl border border-dashed border-line bg-paper-raised p-5">
                  <p className="mb-1 text-[12px] font-semibold uppercase tracking-wider text-muted">
                    Issued to
                  </p>
                  <p className="mb-4 font-display text-[18px] font-semibold text-ink">
                    {certificate.issuedTo}
                  </p>
                  <div className="flex items-center justify-between border-t border-line pt-4 text-[12px] text-muted">
                    <span>Issued {certificate.issuedAt}</span>
                    <span className="font-code">ID · {certificate.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 p-5">
                <button className="inline-flex items-center gap-2 rounded-lg bg-emerald px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-emerald-deep">
                  <Download size={15} />
                  Download PDF
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-line bg-paper px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-line/40">
                  <ExternalLink size={15} />
                  Public Verify Link
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-line bg-paper px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-line/40">
                  <QrCode size={15} />
                  Show QR Code
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-line bg-paper-raised p-12 text-center shadow-sm">
          <Award size={36} className="mx-auto mb-4 text-muted" />
          <h2 className="mb-2 font-display text-[22px] font-bold text-ink">
            No certificates yet
          </h2>
          <p className="mx-auto max-w-[420px] text-[14px] text-muted">
            Complete a course to earn your first verifiable certificate with a unique ID and QR code.
          </p>
          <a
            href="/dashboard/courses"
            className="mt-6 inline-flex rounded-lg bg-emerald px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-emerald-deep"
          >
            Browse courses
          </a>
        </div>
      )}
    </main>
  );
}
