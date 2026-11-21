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
research_flow: true # set to false to hide the research animation
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

I am a final-year Ph.D. student affiliated with Division of Decision and Control Systems (DCS) at KTH Royal Institute of Technology. I am fortunate to jointly work with [Prof. Karl H. Johansson](https://people.kth.se/~kallej/) at KTH and [Prof. Michael M. Zavlanos](https://www.michaelmzavlanos.org/) at Duke University.

From January to April 2026, I was visiting Learning & Adaptive Systems Group at ETH Zurich, hosted by [Prof. Andreas Krause](https://las.inf.ethz.ch/krausea). Prior to my PhD, I received both the master and bachelor degrees at Honors School of Harbin Institute of Technology.

My research centers on optimization over probability distributions, at the intersection of control, optimization, and generative modeling. This perspective has carried me from control and optimal transport through robust, risk-sensitive learning, and now to steering generative models. My goal is to develop the mathematical and algorithmic foundations for controllable and efficient generative-model steering, and to translate these advances into applications in scientific discovery.

{% if page.research_flow %}

<link rel="stylesheet" href="{{ '/assets/css/research-flow.css' | relative_url }}" />

<section
  class="research-flow"
  data-research-flow
  aria-label="A left-hand burst of light gradually forms Welcome, then the same particles swirl into a Möbius manifold before repeating"
  markdown="0"
>
  <div class="research-flow__field">
    <canvas class="research-flow__canvas" aria-hidden="true"></canvas>
    <svg class="research-flow__fallback" viewBox="0 0 1000 600" role="img" aria-label="A luminous Möbius manifold">
      <defs>
        <linearGradient id="research-flow-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#8fc8ff"></stop>
          <stop offset="55%" stop-color="#b5a0ff"></stop>
          <stop offset="100%" stop-color="#e3b0f4"></stop>
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#research-flow-gradient)" stroke-linecap="round" stroke-width="1.2">
        <path d="M260 320 C220 85 680 75 760 275 C825 440 360 430 300 225 C250 70 690 135 740 345 C775 495 260 490 260 320 Z" opacity="0.8"></path>
        <path d="M280 320 C240 110 660 95 740 275 C790 420 380 405 320 230 C275 100 670 155 720 345 C750 470 280 460 280 320 Z" opacity="0.45"></path>
        <path
          d="M300 320 C265 135 640 120 720 275 C760 395 400 385 340 240 C300 130 650 175 700 345 C730 445 300 435 300 320 Z"
          opacity="0.35"
        ></path>
      </g>
    </svg>
  </div>
  <p class="research-flow__caption">Steering Generative Distributions</p>
  <div class="research-flow__controls">
    <button class="research-flow__replay" type="button" aria-label="Replay animation from the beginning" hidden>Replay</button>
    <button class="research-flow__toggle" type="button" aria-label="Pause animation" aria-pressed="false" hidden>
      <span class="research-flow__toggle-icon" aria-hidden="true"></span>
      <span class="research-flow__toggle-label">Pause</span>
    </button>
  </div>
</section>

<script src="{{ '/assets/js/research-flow.js' | relative_url }}" defer></script>

{% endif %}

<section class="research-map" aria-label="Research overview" markdown="0">
  <div class="research-map__row">
    <h2 class="research-map__label">Methods in Decision-Making</h2>
    <div class="research-map__content">
      <p class="research-map__intro">
        I develop distributional learning and optimization methods for decision-making.
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
            <h3>Distributionally Robust OPT</h3>
            <ul>
              <li>
                <a href="{{ '/publications/' | relative_url }}#wang2024outlier">Outlier-Robust DRO</a>
              </li>
              <li><a href="https://arxiv.org/abs/2509.24462">Outlier-Robust Federated Learning</a></li>
              <li><a href="https://arxiv.org/abs/2511.14048">Distributionally robust games</a></li>
            </ul>
          </div>
          <div class="research-map__topic">
            <h3>Distributional RL</h3>
            <ul>
              <li><a href="https://arxiv.org/abs/2303.13657">Risk-averse LQR</a></li>
              <li><a href="https://arxiv.org/abs/2401.10240">Distributional policy evaluation in LQR</a></li>
            </ul>
          </div>
          <div class="research-map__topic">
            <h3>Decision-Dependent OPT</h3>
            <ul>
              <li><a href="https://arxiv.org/abs/2310.02384">Constrained Optimization in Dual Space</a></li>
              <li><a href="https://arxiv.org/abs/2508.08856">Projected Gradient-Descent</a></li>
            </ul>
          </div>
          <div class="research-map__topic">
            <h3>Game-Theoretic Learning</h3>
            <ul>
              <li><a href="https://arxiv.org/abs/2307.08812">Asymmetric Games</a></li>
              <li><a href="https://arxiv.org/abs/2403.10399">Risk-Averse Nash Equilibria</a></li>
              <li><a href="https://arxiv.org/abs/2508.09111">Asynchronous Games</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  <div class="research-map__row">
    <h2 class="research-map__label">Methods in Generative Modeling</h2>
    <div class="research-map__content">
      <p class="research-map__intro">I also develop methods for adapting and steering generative models.</p>
        <div class="research-map__grid">
          <div class="research-map__topic">
            <h3>Risk-Sensitive Fine-Tuning</h3>
            <ul>
              <li><a href="https://arxiv.org/abs/2602.16796">Tail-Aware Flow Fine-Tuning</a></li>
              <li> DFFT</li>
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
          <div class="research-map__topic">
            <h3>Constrained Generative Models</h3>
            <ul>
              <li> CCFO</li>
            </ul>
          </div>
          <div class="research-map__topic">
            <h3>Robust generation under distribution shifts</h3>
            <ul>
              <li> GDRGO</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  <div class="research-map__row">
    <h2 class="research-map__label">Applications</h2>
    <div class="research-map__content">
      <p class="research-map__intro">
        Some selected applications include
      </p>
      <div class="research-map__grid">
        <div class="research-map__topic">
          <h3>Scientific Discovery</h3>
          <ul>
            <li><a href="https://arxiv.org/abs/2602.16796">Tail-Aware Flow Fine-Tuning</a></li>
            <li> CCFO </li>
            <li> GDRGO </li>
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
