---
layout: about
title: about
permalink: /
subtitle: Ph.D. student at KTH Royal Institute of Technology

profile:
  align: right
  image: bio_zifan.png
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>KTH Royal Institute of Technology</p>
    <p>Stockholm, Sweden</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: false # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<!-- Write your biography here. Tell the world about yourself. Link to your favorite [subreddit](https://www.reddit.com). You can put a picture in, too. The code is already in, just name your picture `prof_pic.jpg` and put it in the `img/` folder.

Put your address / P.O. box / other info right below your picture. You can also disable any of these elements by editing `profile` property of the YAML header of your `_pages/about.md`. Edit `_bibliography/papers.bib` and Jekyll will render your [publications page](/al-folio/publications/) automatically.

Link to your social media connections, too. This theme is set up to use [Font Awesome icons](https://fontawesome.com/) and [Academicons](https://jpswalsh.github.io/academicons/), like the ones below. Add your Facebook, Twitter, LinkedIn, Google Scholar, or just disable all of them. -->

I am a fourth-year Ph.D. student affiliated with Division of Decision and Control Systems (DCS) at KTH Royal Institute of Technology. I am fortunate to jointly work with [Prof. Karl H. Johansson](https://people.kth.se/~kallej/) at KTH and [Prof. Michael M. Zavlanos](https://www.michaelmzavlanos.org/) at Duke University.

From January to April 2026, I was visiting Learning & Adaptive Systems Group at ETH Zurich, hosted by [Prof. Andreas Krause](https://las.inf.ethz.ch/krausea). Prior to my PhD, I received both the master and bachelor degrees at Honors School of Harbin Institute of Technology.

My research centers on optimization over probability distributions, at the intersection of control, optimization, and generative modeling. I am broadly interested in the intersection of generative model, control, and optimization. This perspective has carried me from control and optimal transport through robust, risk-sensitive learning, and now to steering generative models. My goal is to develop the mathematical and algorithmic foundations for reliable and controllable generative-model steering, and to translate these advances into applications such as scientific discovery.

<section class="research-map" aria-label="Research overview" markdown="0">
  <div class="research-map__row">
    <h2 class="research-map__label">Methods in Decision-Making</h2>
    <div class="research-map__content">
      <p class="research-map__intro">
        I develop distributional learning and optimization methods for decision-making and generative models.
      </p>
      <div class="research-map__grid">
          <div class="research-map__topic">
            <h3>Risk-Averse Learning</h3>
            <ul>
              <li><a href="https://arxiv.org/abs/2203.08957">No-Regret Learning</a></li>
              <li><a href="https://arxiv.org/abs/2404.02988">Non-Stationary Distributions</a></li>
            </ul>
          </div>
          <div class="research-map__topic">
            <h3>Distributionally Robust Optimization</h3>
            <ul>
              <li>
                <a href="{{ '/publications/' | relative_url }}#wang2024outlier">Outlier-Robust DRO</a>
              </li>
              <li><a href="https://arxiv.org/abs/2509.24462">Outlier-Robust Federated Learning</a></li>
            </ul>
          </div>
          <div class="research-map__topic">
            <h3>Distributional RL</h3>
            <ul>
              <li><a href="https://arxiv.org/abs/2303.13657">Distributional LQR</a></li>
              <li><a href="https://arxiv.org/abs/2401.10240">Distributional LQR (Extended)</a></li>
            </ul>
          </div>
          <div class="research-map__topic">
            <h3>Decision-Dependent Optimization</h3>
            <ul>
              <li><a href="https://arxiv.org/abs/2310.02384">Constrained Optimization</a></li>
            </ul>
          </div>
          <div class="research-map__topic">
            <h3>Game-Theoretic Learning</h3>
            <ul>
              <li><a href="https://arxiv.org/abs/2307.08812">Asymmetric Games</a></li>
              <li><a href="https://arxiv.org/abs/2403.10399">Risk-Averse Nash Equilibria</a></li>
              <li><a href="https://arxiv.org/abs/2511.14048">Distributionally robust games</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  <div class="research-map__row">
    <h2 class="research-map__label">Methods in Generative Modeling</h2>
    <div class="research-map__content">
      <p class="research-map__intro">I develop methods for adapting, guiding, and distributing generative models.</p>
        <div class="research-map__grid">
          <div class="research-map__topic">
            <h3>Risk-Sensitive Fine-Tuning</h3>
            <ul>
              <li><a href="https://arxiv.org/abs/2602.16796">Tail-Aware Flow Fine-Tuning</a></li>
            </ul>
          </div>
          <div class="research-map__topic">
            <h3>Inference-Time Guidance</h3>
            <ul>
              <li><a href="https://arxiv.org/abs/2508.14807">Source-Guided Flow Matching</a></li>
            </ul>
          </div>
          <div class="research-map__topic">
            <h3>Federated Generative Models</h3>
            <ul>
              <li><a href="https://arxiv.org/abs/2509.21250">Federated Flow Matching</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  <div class="research-map__row">
    <h2 class="research-map__label">Applications</h2>
    <div class="research-map__content">
      <p class="research-map__intro">
        I have been focusing on developing general-purpose methods that transfer across domains. Examples:
      </p>
      <div class="research-map__grid">
        <div class="research-map__topic">
          <h3>Scientific Discovery</h3>
          <ul>
            <li><a href="https://arxiv.org/abs/2602.16796">Tail-Aware Flow Fine-Tuning</a></li>
          </ul>
        </div>
        <div class="research-map__topic">
          <h3>Image Generation</h3>
          <ul>
            <li><a href="https://arxiv.org/abs/2602.16796">Tail-Aware Flow Fine-Tuning</a></li>
            <li><a href="https://arxiv.org/abs/2508.14807">Source-Guided Flow Matching</a></li>
          </ul>
        </div>
        <div class="research-map__topic">
          <h3>Robotics &amp; Transportation</h3>
          <ul>
            <li><a href="https://arxiv.org/abs/2512.21133">SparScene</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .profile > figure {
    width: min(100%, 210px);
    margin-left: auto;
  }

  .profile > figure picture,
  .profile > figure img {
    display: block;
    width: 100% !important;
    height: auto;
  }

  .research-map {
    clear: both;
    margin: 2.75rem 0 2.25rem;
  }

  .research-map__row {
    display: grid;
    grid-template-columns: 9.25rem minmax(0, 1fr);
    gap: 1.25rem;
    align-items: start;
  }

  .research-map__row + .research-map__row {
    margin-top: 2rem;
  }

  .research-map__label {
    margin: 0;
    padding-top: 0.25rem;
    color: var(--global-theme-color, #b509ac);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1.35;
    text-align: right;
    text-transform: uppercase;
  }

  .research-map__content {
    min-width: 0;
    padding-left: 1.4rem;
    border-left: 2px solid var(--global-theme-color, #b509ac);
  }

  .research-map__intro {
    max-width: 44rem;
    margin: 0 0 1rem;
    line-height: 1.55;
  }

  .research-map__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem 1.75rem;
  }

  .research-map__topic {
    min-width: 0;
  }

  .research-map__topic h3 {
    margin: 0 0 0.35rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.025em;
    line-height: 1.4;
    text-transform: uppercase;
  }

  .research-map__topic ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .research-map__topic li {
    margin: 0.12rem 0;
    line-height: 1.4;
  }

  .research-map__topic a {
    text-decoration-thickness: 1px;
    text-underline-offset: 0.16em;
  }

  @media (max-width: 767.98px) {
    .research-map__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 575.98px) {
    .profile > figure {
      width: min(50vw, 180px);
      margin-right: auto;
    }

    .research-map {
      margin-top: 2.25rem;
    }

    .research-map__row {
      grid-template-columns: minmax(0, 1fr);
      gap: 0.45rem;
    }

    .research-map__label {
      padding: 0 0 0 0.9rem;
      text-align: left;
    }

    .research-map__content {
      padding-left: 0.9rem;
    }

    .research-map__grid {
      grid-template-columns: minmax(0, 1fr);
      gap: 1rem;
    }
  }
</style>
