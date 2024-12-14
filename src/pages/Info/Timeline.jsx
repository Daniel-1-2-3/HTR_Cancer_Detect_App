import { useEffect, useState } from 'react';
import './Timeline.css';

const Timeline = () => {
  const [inView, setInView] = useState(false);

  const handleScroll = () => {
    const element = document.getElementById('timeline');
    const rect = element.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      setInView(true);
    } else {
      setInView(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`timeline-container ${inView ? 'active' : ''}`} id="timeline">
      <div className="timeline">
        <div className="event left">
            <p><strong>1950s:</strong> In the 1950s, skin cancer awareness began to grow as dermatologists noticed an increasing number of cases, especially among individuals with fair skin. At this time, no clear link between sun exposure and skin cancer was established, but the foundation for future research was laid.</p>
            <p><em>Fact:</em> By the 1950s, skin cancer was considered a rare form of cancer, but its prevalence began to rise in Western countries with higher UV exposure.</p>
        </div>
        <div className="line" />
        <div className="event right">
            <p><strong>1970s:</strong> The 1970s marked the beginning of the sunscreen industrys development. Early formulations mainly included zinc oxide and PABA, providing a physical barrier against UV radiation. Dermatologists and public health officials started to warn about the dangers of sunburn and its link to skin cancer, specifically melanoma.</p>
            <p><em>Statistic:</em> Between 1970 and 1980, sunscreen sales grew by 800%, as the awareness about the harmful effects of UV radiation increased.</p>
        </div>
        <div className="event left">
            <p><strong>1980s:</strong> The introduction of SPF 15 sunscreen was a game changer, providing higher protection against UVB rays. During this decade, research increasingly pointed to the suns ultraviolet rays as a key factor in the development of skin cancer, particularly melanoma.</p>
            <p><em>Fact:</em> The American Academy of Dermatology (AAD) started advocating for daily sunscreen use by 1983, specifically recommending broad-spectrum protection against both UVA and UVB rays.</p>
            <p><em>Statistic:</em> Melanoma incidence rates began to rise significantly during the 1980s, particularly in countries with high levels of sun exposure like Australia and the United States.</p>
        </div>
        <div className="line" />
        <div className="event right">
            <p><strong>1990s:</strong> The 1990s saw an increase in public health campaigns focused on melanoma. The <em>American Cancer Society</em> launched educational campaigns urging the public to perform self-skin checks and seek professional help for unusual moles or spots. The Slip! Slop! Slap! campaign in Australia also gained significant traction, urging people to slip on a shirt, slop on sunscreen, and slap on a hat.</p>
            <p><em>Statistic:</em> In 1992, the melanoma incidence rate in the United States was 14.2 cases per 100,000 people, which increased by over 3% annually throughout the decade.</p>
            <p><em>Fact:</em> The discovery of the link between tanning beds and an increased risk of skin cancer led to heightened concern about indoor tanning practices.</p>
        </div>
        <div className="event left">
            <p><strong>2000s:</strong> The introduction of the UV Index (UVI) in 2001 provided a daily guide to the public regarding the strength of ultraviolet radiation in a given area. The 2000s also saw continued increases in skin cancer rates, with a particular spike in young adults under 40 years old.</p>
            <p><em>Statistic:</em> The incidence of nonmelanoma skin cancers (like basal cell carcinoma and squamous cell carcinoma) is higher than melanoma. In the 2000s, the incidence rate of basal cell carcinoma was estimated to be over 2 million cases annually in the U.S.</p>
            <p><em>Fact:</em> The rise in tanning bed use among teenagers led to a significant increase in skin cancer cases, with studies showing that people who start tanning before the age of 35 have a 75% higher chance of developing melanoma.</p>
        </div>
        <div className="line" />
        <div className="event right">
            <p><strong>2010s:</strong> Immunotherapy became a cornerstone of melanoma treatment, particularly in late-stage melanoma. The FDA approved new drugs like ipilimumab (Yervoy) in 2011 and pembrolizumab (Keytruda) in 2014, which were breakthrough therapies designed to stimulate the body’s immune system to attack melanoma cells.</p>
            <p><em>Statistic:</em> By 2019, approximately 50% of patients with advanced melanoma showed clinical benefits from immunotherapy treatments.</p>
            <p><em>Fact:</em> During the 2010s, the FDA also approved the first targeted therapies for melanoma, such as BRAF inhibitors, which showed dramatic success in shrinking tumors for patients with specific genetic mutations.</p>
        </div>
        <div className="event left">
            <p><strong>2020s:</strong> Skin cancer research is moving towards personalized medicine, where treatments are tailored based on a patients genetic makeup. The use of AI in dermatology for the early detection of skin cancer through image recognition and machine learning models is expanding. This technology has the potential to drastically improve early diagnosis, leading to better outcomes.</p>
            <p><em>Statistic:</em> As of 2022, over 9,000 Americans are expected to die from melanoma, but early detection through regular skin checks can reduce mortality by up to 63%.</p>
            <p><em>Fact:</em> Several pharmaceutical companies are now working on combining immunotherapy with targeted therapies to enhance the body’s ability to combat skin cancer in its advanced stages. Research into using nanoparticles to deliver chemotherapy directly to skin cancer cells is ongoing.</p>
        </div>
        <div className="line" />
        <div className="event right">
            <p><strong>2025 (Projected):</strong> Researchers predict that personalized vaccines and further advancements in CRISPR gene editing will revolutionize skin cancer treatment. By 2025, the goal is to develop targeted treatments that not only cure skin cancer but also prevent recurrence by editing the genes responsible for tumor growth.</p>
            <p><em>Statistic:</em> Skin cancer is now the most common form of cancer in the United States, with more than 9,500 people diagnosed every day.</p>
        </div>
        <div className="event left">
            <p><strong>Future:</strong> The future of skin cancer treatment lies in genetic screening for early detection and the development of more sophisticated treatments that target cancer at the molecular level. CRISPR gene editing may allow scientists to “repair” the DNA that causes skin cells to become cancerous, preventing tumors from forming.</p>
            <p><em>Fact:</em> Clinical trials in the coming years may test new drugs that prevent melanoma in high-risk individuals, especially those with a family history or certain genetic mutations.</p>
            <p><em>Statistic:</em> The global incidence rate of melanoma is increasing by approximately 3% annually, with the highest rates in countries like Australia and Norway. However, prevention efforts are expected to slow this rise in the future.</p>
        </div>
        </div>
    </div>
  );
};

export default Timeline;