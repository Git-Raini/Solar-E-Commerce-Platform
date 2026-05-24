import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";

export default async function InstallersPage() {
  const installers = await prisma.installer.findMany({
    include: {
      jobs: true,
    },
  });

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container">
          <h1>Installer network</h1>
          <p className="section-subtitle">View partner availability, recent jobs, and regional installer capacity.</p>
          <div className="grid-3" style={{ marginTop: "2rem" }}>
            {installers.map((installer) => (
              <div key={installer.id} className="card">
                <h3>{installer.name}</h3>
                <p>{installer.region}</p>
                <p>Rating: {installer.rating.toFixed(1)} / 5</p>
                <p>Status: {installer.available ? "Available" : "Busy"}</p>
                <h4 style={{ marginTop: "1rem" }}>Recent jobs</h4>
                <ul className="detail-list">
                  {installer.jobs.slice(0, 3).map((job) => (
                    <li key={job.id}>{job.customerName} — {new Date(job.scheduledAt).toLocaleDateString()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
