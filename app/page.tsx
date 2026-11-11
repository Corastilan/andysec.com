export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-zinc-100">
      <h1 className="mb-4 text-3xl font-semibold">
        <a href="#andy-then">Andy Then</a>
      </h1>

      <p className="mb-4">
        I am a graduate student in Cybersecurity, currently attending the{" "}
        <a href="https://engineering.nyu.edu/" className="underline">
          New York University Tandon School of Engineering
        </a>
        .
      </p>

      <p className="mb-4">
        My current work involves cryptography, operating systems, and general
        security practices. My{" "}
        <a href="https://github.com/Corastilan" className="underline">
          GitHub
        </a>{" "}
        hosts some of my projects from my undergraduate years as well as some
        current ones, but I do not always upload them.
      </p>

      <p>
        My primary method of contact is my personal email. This will be the
        fastest way to ensure a response. My email is{" "}
        <a href="mailto:contact@andysec.com" className="underline">
          contact@andysec.com
        </a>
        . I am open to employment, but please make sure the role pertains to
        the Cybersecurity or Software Engineering discipline.
      </p>
    </main>
  );
}
