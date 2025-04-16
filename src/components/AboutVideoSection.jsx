const AboutVideoSection = () => {
  return (
    <section className="px-4 py-12">
      <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg aspect-video">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/tgbNymZ7vqY" // buraya kendi videonun URL'sini yapıştırabilirsin
          title="Company Promo Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default AboutVideoSection;
