const fs = require('fs');
const path = require('path');

const baseDir = path.join('c:', 'Users', 'user', 'Desktop', 'safe-h', 'website');

const headerHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAFE-H: {title}</title>
    <meta name="description" content="통계적 추출과 설명 가능한 AI(XAI)를 활용하여 객관적이고 신뢰할 수 있는 K-Forensic 시스템을 구축하는 SAFE-H 프로젝트 사이트입니다.">
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header & Navigation -->
    <header id="header" class="solid">
        <div class="nav-container">
            <div class="logo">
                <a href="/index.html">SAFE-H</a>
            </div>
            <nav class="nav-links">
                <a href="/index.html#about">About</a>
                <a href="/research.html" {research_active}>Research</a>
                <a href="/plan.html" {plan_active}>Plan</a>
                <a href="/collaboration.html" {collaboration_active}>Collaboration</a>
                <a href="/team.html" {team_active}>Team</a>
                <a href="/publications.html" {publications_active}>Publications</a>
                <a href="#" class="contact-trigger">Contact</a>
            </nav>
            <div class="hamburger">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>

    <div class="mobile-menu">
        <a href="/index.html#about" class="mobile-link">About</a>
        <a href="/research.html" class="mobile-link {research_mobile_active}">Research</a>
        <a href="/plan.html" class="mobile-link {plan_mobile_active}">Plan</a>
        <a href="/collaboration.html" class="mobile-link {collaboration_mobile_active}">Collaboration</a>
        <a href="/team.html" class="mobile-link {team_mobile_active}">Team</a>
        <a href="/publications.html" class="mobile-link {publications_mobile_active}">Publications</a>
        <a href="#" class="mobile-link contact-trigger">Contact</a>
    </div>
`;

const footerHtml = `    <footer class="site-footer">
        <div class="container inner-footer">
            <div class="footer-left">
                <h2>SAFE-H</h2>
                <p>글로컬 R&D 지원 연구과제 홈페이지</p>
                <div class="social-links">
                    <a href="#" class="contact-trigger" title="문의하기"><i class="fas fa-envelope"></i></a>
                    <a href="#"><i class="fas fa-globe"></i></a>
                </div>
            </div>
            <div class="footer-center">
                <h3>연구 참여 기관</h3>
                <ul>
                    <li>부산대학교 (PNU)</li>
                    <li>부경대학교 (PKNU)</li>
                    <li>CSAFE (Center for Statistics and Applications in Forensic Evidence)</li>
                    <li>국립과학수사연구원 (NFS)</li>
                </ul>
            </div>
            <div class="footer-right">
                <h3>빠른 이동</h3>
                <ul class="quick-links">
                    <li><a href="/index.html#about">프로젝트 미션</a></li>
                    <li><a href="/research.html">핵심 연구 내용</a></li>
                    <li><a href="/publications.html">연구성과</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 SAFE-H Project. All rights reserved.</p>
        </div>
    </footer>

    <!-- Contact Modal -->
    <div id="contact-modal" class="modal-overlay">
        <div class="modal-content">
            <button id="close-modal" class="modal-close">&times;</button>
            <h2 class="section-title">문의하기</h2>
            <p class="section-subtitle">프로젝트 또는 기술 협력 관련 문의사항을 남겨주세요.</p>
            
            <div class="contact-form-container">
                <form id="contact-form" class="styled-form">
                    <div class="form-group">
                        <label for="email">이메일 (Email)</label>
                        <input type="email" id="email" name="email" required placeholder="example@email.com" />
                    </div>
                    <div class="form-group">
                        <label for="message">메시지 (Message)</label>
                        <textarea id="message" name="message" required rows="5" placeholder="문의하실 내용을 입력해 주세요."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">문의 보내기 (Send)</button>
                </form>
            </div>
        </div>
    </div>
    <script type="module" src="/main.js"></script>
</body>
</html>
`;

const parkPublications = [
    { year: "2026", title: "Enhancing automated shoeprint comparison via synthetic data generation and deep segmentation", journal: "Science & Justice", authors: "Yejin Kim, Alicia Carriquiry and Soyoung Park", summary: "K-Forensic 패턴 인식을 위한 데이터 생성 및 정합 연구" },
    { year: "2025", title: "Benchmarking of dimensionality reduction methods to capture drug response in transcriptome data", journal: "Scientific Reports", authors: "Yuseong Kwon, Sojeong Park, Soyoung Park and Heaseung Lee", summary: "약물 반응 포착을 위한 차원 축소 기법의 벤치마킹 연구" },
    { year: "2025", title: "Enhancing forensic shoeprint analysis: Application of the Shoe-MS algorithm to challenging evidence", journal: "Science & Justice", authors: "Moonsoo Jang, Alicia Carriquiry and Soyoung Park", summary: "Shoe-MS 알고리즘을 활용한 증거 분석 고도화" },
    { year: "2024", title: "A deep learning approach for the comparison of handwritten documents using latent feature vectors", journal: "Statistical Analysis and Data Mining", authors: "Juhyeon Kim, Soyoung Park and Alicia Carriquiry", summary: "잠재 특징 벡터를 활용한 필적 정합 분석" },
    { year: "2024", title: "An automated alignment algorithm for identification of the source of footwear impressions", journal: "Statistical Analysis and Data Mining", authors: "Hana Lee, Alicia Carriquiry and Soyoung Park", summary: "족적 소스 식별을 위한 자동 정합 알고리즘 연구" },
    { year: "2023", title: "A finely tuned deep transfer learning algorithm to compare outsole images", journal: "Statistical Analysis and Data Mining", authors: "Moonsoo Jang, Soyoung Park and Alicia Carriquiry", summary: "전이 학습 기반의 고신뢰 족적 비교 기술" },
    { year: "2022", title: "The effect of image descriptors on the performance of classifiers of footwear outsole image pairs", journal: "Forensic Science International", authors: "Soyoung Park and Alicia Carriquiry", summary: "이미지 기술자가 족적 분류 성능에 미치는 영향 분석" },
    { year: "2020", title: "Quantifying the similarity of 2D images using edge pixels", journal: "Journal of Applied Statistics", authors: "Soyoung Park and Alicia Carriquiry", summary: "에지 픽셀을 이용한 2D 이미지 유사도 정량화" },
    { year: "2020", title: "A database of two-dimensional images of footwear outsole impressions", journal: "Data in Brief", authors: "Soyoung Park, Alicia Carriquiry", summary: "2D 족적 이미지 데이터베이스 구축 성과" },
    { year: "2020", title: "A database of elemental compositions of architectural float glass samples measured by LA-ICP-MS", journal: "Data in Brief", authors: "Soyoung Park, Alicia Carriquiry, et al.", summary: "건축용 유리 샘플의 원소 성분 데이터베이스 구축" },
    { year: "2020", title: "An algorithm to compare two-dimensional footwear outsole images using maximum cliques", journal: "Statistical Analysis and Data Mining", authors: "Soyoung Park and Alicia Carriquiry", summary: "최대 클릭 알고리즘을 활용한 족적 이미지 비교" },
    { year: "2019", title: "Evaluation and comparison of methods for forensic glass source conclusions", journal: "Forensic Science International", authors: "Soyoung Park and Sam Tyner", summary: "법정 유리 증거 결론 산출을 위한 방법론 비교" },
    { year: "2019", title: "Learning algorithms to evaluate forensic glass evidence", journal: "The Annals of Applied Statistics", authors: "Soyoung Park and Alicia Carriquiry", summary: "유리 증거 평가를 위한 학습 알고리즘 연구" },
    { year: "2014", title: "Modeling and forecasting realized volatilities of Korean financial assets", journal: "Asia-Pacific Journal of Financial Studies", authors: "Soyoung Park and Dong Wan Shin", summary: "한국 금융 자산의 실현 변동성 모델링 및 예측" }
];

const choiPublications = [
    { year: "2025", title: "Vector SHAP values for machine learning time series forecasting", journal: "Journal of Forecasting", authors: "Ji-Eun Choi, Ji Won Shin and Dong Wan Shin", summary: "시계열 예측 해석을 위한 Vector SHAP 모델 제안" },
    { year: "2025", title: "Nonparametric kernel estimation for local tail-event correlation", journal: "Statistics and Its Interface", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "국소 꼬리 이벤트 상관관계의 비모수적 추정" },
    { year: "2025", title: "A break test for the tail-event correlation matrix based on self-normalization", journal: "Journal of the Korean Statistical Society", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "자기 정형화 기반 꼬리 이벤트 상관 행렬 검정" },
    { year: "2025", title: "SHAP explanation of machine learning forecasting of PM10 concentration", journal: "The Korean Journal of Applied Statistics", authors: "Byungjun Ko, et al.", summary: "미세먼지 농도 예측을 위한 SHAP 설명 기법" },
    { year: "2024", title: "Subsample scan test for multiple breaks based on self-normalization", journal: "Communications in Statistics", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "다중 변화점 탐지를 위한 부분 표본 스캔 검정" },
    { year: "2024", title: "A self-normalization test for structural breaks in a regression model for panel data sets", journal: "Journal of the Korean Statistical Society", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "패널 데이터 구조적 변화점 탐험 기법" },
    { year: "2024", title: "DR-LSTM: Dimension reduction based deep learning approach to predict stock price", journal: "Communications for Statistical Applications and Methods", authors: "Ah-ram Lee, et al.", summary: "주가 예측을 위한 차원 축소 기반 LSTM 접근법" },
    { year: "2024", title: "Forecasting realized volatility using data normalization and recurrent neural network", journal: "Communications for Statistical Applications and Methods", authors: "Yoonjoo Lee, et al.", summary: "데이터 정규화 및 RNN을 활용한 실현 변동성 예측" },
    { year: "2023", title: "Bootstrapping tests for breaks in mean or variance based on U-statistics", journal: "Journal of Statistical Computation and Simulation", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "U-통계량 기반 평균 및 분산 변화점 부트스트랩 검정" },
    { year: "2022", title: "Quantile correlation coefficient: a new tail dependence measure", journal: "Statistical Papers", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "새로운 꼬리 의존성 척도인 분위 상관계수 제안" },
    { year: "2022", title: "Parallel architecture of CNN-bidirectional LSTMs for implied volatility forecast", journal: "Journal of Forecasting", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "내재 변동성 예측을 위한 병렬 CNN-BiLSTM 구조" },
    { year: "2022", title: "How to improve oil consumption forecast using google trends?", journal: "Communications for Statistical Applications and Methods", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "구글 트렌드 데이터를 활용한 석유 소비 예측 개선" },
    { year: "2021", title: "A self-normalization break test for correlation matrix", journal: "Statistical Papers", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "상관 행렬을 위한 자기 정형화 변화점 검정" },
    { year: "2021", title: "A general panel break test based on the self-normalization method", journal: "Journal of the Korean Statistical Society", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "자기 정형화 기반 일반 패널 변화점 검정" },
    { year: "2021", title: "Nonparametric estimation of time varying correlation coefficient", journal: "Journal of the Korean Statistical Society", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "시간 가변 상관계수의 비모수적 추정 연구" },
    { year: "2020", title: "A self-normalization test for correlation change", journal: "Economics Letters", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "상관관계 변화를 위한 자기 정형화 테스트" },
    { year: "2020", title: "Block bootstrapping for a panel mean break test", journal: "Journal of the Korean Statistical Society", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "패널 평균 변화점 검정을 위한 블록 부트스트랩" },
    { year: "2020", title: "Bootstrapping volatility spillover index", journal: "Communications in Statistics", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "변동성 전이 지수 부트스트래핑 분석" },
    { year: "2019", title: "The roles of differencing and dimension reduction in machine learning forecasting", journal: "Communications for Statistical Applications and Methods", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "머신러닝 예측에서 차분 및 차원 축소의 역할 연구" },
    { year: "2019", title: "Three regime bivariate normal distribution: a new estimation method for CoVaR", journal: "The European Journal of Finance", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "CoVaR 추정을 위한 3개 레짐 이변량 정규 분포" },
    { year: "2019", title: "Moving block bootstrapping for a CUSUM test for correlation change", journal: "Computational Statistics and Data Analysis", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "상관관계 변화 CUSUM 검정을 위한 이동 블록 부트스트랩" },
    { year: "2019", title: "Quantile forecasts for financial volatilities based on parametric and asymmetric models", journal: "Journal of the Korean Statistical Society", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "파라미터 및 비대칭 모델 기반 금융 변동성 분위 예측" },
    { year: "2018", title: "Forecasts for leverage heterogeneous autoregressive models with jumps", journal: "Journal of Forecasting", authors: "Ji-Eun Choi and Dong Wan Shin", summary: "도약이 포함된 레버리지 이질적 자기회귀 모델 예측" },
    { year: "2018", title: "Forecasting daily PM10 concentrations in Seoul using data mining", journal: "Communications for Statistical Applications and Methods", authors: "Ji-Eun Choi, et al.", summary: "데이터 마이닝 기법을 활용한 서울 미세먼지 농도 예측" },
    { year: "2017", title: "Value at risk forecasting for volatility index", journal: "Applied Economics Letters", authors: "Seul-Ki Park, et al.", summary: "변동성 지수를 위한 위험 가치(VaR) 예측 연구" }
];

const getIconForPub = (title, summary) => {
    const text = (title + " " + summary).toLowerCase();
    
    // 0. 필적 / 서명 및 동역학 분석 (Handwritten, Signature, Handwriting) - 최우선 순위
    if (text.includes("handwritten") || text.includes("handwriting") || text.includes("필적") || text.includes("signature")) return "fas fa-signature";

    // 1. 시계열 예측, 추세 분석 및 변동성 모델링 (Forecasting, Predict, Trend, Volatility) - 사용자 선호 아이콘 (chart-line)
    if (text.includes("forecast") || text.includes("predict") || text.includes("trend") || text.includes("volatilit")) return "fas fa-chart-line";

    // 2. 딥러닝 아키텍처 및 복합 네트워크 (Deep Learning, CNN, LSTM)
    if (text.includes("deep learning") || text.includes("lstm") || text.includes("cnn") || text.includes("neural network")) return "fas fa-network-wired";
    
    // 3. 설명가능한 AI 및 특징 중요도 분석 (Vector SHAP, XAI)
    if (text.includes("shap") || text.includes("explanation")) return "fas fa-sitemap";
    
    // 4. 차원 축소 및 잠재 벡터 모델링 (Dimensionality reduction, Latent feature)
    if (text.includes("dimension reduction") || text.includes("latent feature") || text.includes("차원 축소")) return "fas fa-compress-arrows-alt";

    // 5. 형태학적 패턴 인식 및 기하 정합 (Shoeprint, Alignment, Outsole, Maximum cliques) - 사용자 선호 아이콘 (clone)
    if (text.includes("shoeprint") || text.includes("footwear") || text.includes("outsole") || text.includes("alignment") || text.includes("clique")) return "fas fa-clone";

    // 6. 2D 이미지 픽셀 및 행렬 유사도 분석 (Image data, edge pixels, descriptors)
    if (text.includes("image") || text.includes("edge pixel")) return "fas fa-th";

    // 6. 정밀 화학 및 스펙트럼 성분 데이터 (Glass, LA-ICP-MS, Drug response)
    if (text.includes("glass") || text.includes("drug") || text.includes("la-icp-ms")) return "fas fa-vial";

    // 7. 구조적 변화점 탐지 및 이상 검정 (Break test, Structural break, CUSUM)
    if (text.includes("break test") || text.includes("breaks") || text.includes("change") || text.includes("cusum") || text.includes("변화점")) return "fas fa-code-branch";

    // 8. 리샘플링 및 자기정형화 기반 비모수 검정 (Bootstrapping, Self-normalization, Nonparametric)
    if (text.includes("bootstrap") || text.includes("self-normalization") || text.includes("nonparametric") || text.includes("자기 정형화")) return "fas fa-sync";

    // 9. 시계열 및 파동 변동 예측 (Time series, PM10, Google trends, Forecasting)
    if (text.includes("time series") || text.includes("pm10") || text.includes("trend") || text.includes("autoregressive")) return "fas fa-wave-square";

    // 10. 금융 리스크 및 극단치 꼬리 의존성 분포 (Volatility, CoVaR, VaR, Tail-event, Quantile)
    if (text.includes("volatility") || text.includes("covar") || text.includes("value at risk") || text.includes("tail") || text.includes("quantile")) return "fas fa-chart-area";

    // 11. 다변량 공분산 및 상관 행렬 모델링 (Correlation matrix, Bivariate normal)
    if (text.includes("correlation") || text.includes("bivariate")) return "fas fa-chart-pie";

    // 범용 확률/통계 모형 (General Forecasting, Modeling)
    return "fas fa-chart-line";
};

const generatePubItems = (pubs) => {
    return pubs.map(pub => {
        const iconClass = getIconForPub(pub.title, pub.summary);
        return `
                <div class="pub-item reveal">
                    <div class="pub-year">${pub.year}</div>
                    <div class="pub-detail">
                        <h4>${pub.title}</h4>
                        <p><strong>${pub.journal}</strong> | ${pub.authors}</p>
                        <p style="margin-top:5px; color: var(--accent-blue); font-size: 0.85rem;">${pub.summary}</p>
                    </div>
                    <div class="pub-icon-wrapper">
                        <i class="${iconClass}"></i>
                    </div>
                </div>`;
    }).join('');
};

const pages = {
    'research.html': {
        title: 'Research', key: 'research',
        content: `<section id="research" class="section bg-light" style="padding-top:120px;">
        <div class="container">
            <h2 class="section-title reveal">핵심 연구 내용</h2>
            <p class="section-subtitle reveal">전통적 감정 체계를 혁신하는 4단계 기술 융합 파이프라인</p>
            <div class="research-grid">
                <div class="research-card reveal">
                    <div class="card-image bg-blue"><i class="fas fa-network-wired"></i></div>
                    <div class="card-content">
                        <h4>1. 정량적 필적 비교모형</h4>
                        <p>한글 및 다국어 필적 기초. <strong>LDA-Tuning 기법</strong>을 적용하여 파라미터 효율을 극대화한 경량 딥러닝 정합 알고리즘을 구축합니다.</p>
                    </div>
                </div>
                <div class="research-card reveal delay-1">
                    <div class="card-image bg-purple"><i class="fas fa-brain"></i></div>
                    <div class="card-content">
                        <h4>2. XAI 매커니즘</h4>
                        <p><strong>Vector SHAP</strong> 및 AEV(Alphabet Expression Value) 기반 설명 추적 기법을 통해 어떤 특징이 판별에 기여했는지를 직관적인 히트맵으로 시각화합니다.</p>
                    </div>
                </div>
                <div class="research-card reveal delay-2">
                    <div class="card-image bg-teal"><i class="fas fa-chart-area"></i></div>
                    <div class="card-content">
                        <h4>3. UQ 및 증거력 산출</h4>
                        <p>결과의 베이지안 불확실성(Uncertainty)을 정량화하고 <strong>점수 기반 우도비(SLR)</strong>의 95% 신뢰 구간을 시뮬레이션하여 법정에서 안전한 지표를 제공합니다.</p>
                    </div>
                </div>
                <div class="research-card reveal delay-3">
                    <div class="card-image bg-orange"><i class="fas fa-search-plus"></i></div>
                    <div class="card-content">
                        <h4>4. MIL 부분 위조 탐지</h4>
                        <p>다중 인스턴스 학습(MIL)과 시계열 속도망을 활용. 획의 필압, 리듬 등 동역학 정보를 분해하여 문서 특정 부위의 정밀 변조(Forgery)를 탐지해 냅니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Roadmap Section -->
    <section id="roadmap" class="section">
        <div class="container">
            <h2 class="section-title reveal">연차별 연구 로드맵</h2>
            <p class="section-subtitle reveal">4년에 걸쳐 고도화되는 K-Forensic 시스템 구축 파이프라인</p>
            
            <div class="timeline">
                <!-- Year 1 -->
                <div class="timeline-item reveal">
                    <div class="timeline-dot bg-blue"></div>
                    <div class="timeline-content">
                        <div class="timeline-layout">
                            <div class="timeline-text">
                                <div class="timeline-year">1차년도 (2026)</div>
                                <h3>기반 구축 및 모형 경량화</h3>
                                <ul>
                                    <li><strong>데이터 수집:</strong> 한글 및 다국어 기반 자체 데이터 자산 구축 및 국제 협력 데이터 확보</li>
                                    <li><strong>LDA-Tuning:</strong> 파라미터 효율을 극대화한 다국어 범용 경량 전이학습 모델 설계</li>
                                    <li><strong>기초 XAI:</strong> Vector SHAP 기반 획 세그먼트별 기여도 분석 시각화 도구 마련</li>
                                </ul>
                            </div>
                            <div class="timeline-image">
                                <img src="/images/y1.png" alt="1차년도 일러스트" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Year 2 -->
                <div class="timeline-item reveal delay-1">
                    <div class="timeline-dot bg-purple"></div>
                    <div class="timeline-content">
                        <div class="timeline-layout reverse">
                            <div class="timeline-text">
                                <div class="timeline-year">2차년도 (2027)</div>
                                <h3>신뢰성 고도화 및 멀티모달 융합</h3>
                                <ul>
                                    <li><strong>멀티모달 융합:</strong> 시각-언어 특징 융합을 통한 자연어 형태의 감정 소견서 자동 생성</li>
                                    <li><strong>불확실성(UQ) 정량화:</strong> 딥러닝 판정의 과신을 방지하는 베이지안 기반 신뢰도 지표 산출</li>
                                    <li><strong>우도비(LR) 검정:</strong> 부트스트래핑(Bootstrapping) 기법을 활용한 95% 신뢰구간 및 통계적 우도비 제공</li>
                                </ul>
                            </div>
                            <div class="timeline-image">
                                <img src="/images/y2.png" alt="2차년도 일러스트" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Year 3 -->
                <div class="timeline-item reveal delay-2">
                    <div class="timeline-dot bg-teal"></div>
                    <div class="timeline-content">
                        <div class="timeline-layout">
                            <div class="timeline-text">
                                <div class="timeline-year">3차년도 (2028)</div>
                                <h3>정밀 탐지 및 시계열 분석</h3>
                                <ul>
                                    <li><strong>부분 위조 탐지:</strong> 다중 인스턴스 학습(MIL) 기반 문서 내 국소적 조작 구간 정밀 식별</li>
                                    <li><strong>히트맵 시각화:</strong> 위조 의심 구간의 직관적 파악을 위한 Attention Rollout 히트맵 제공</li>
                                    <li><strong>시계열 고도화:</strong> 필압·속도 분해를 통한 동역학적 이상 신호 추출 및 위조 근거 보강</li>
                                </ul>
                            </div>
                            <div class="timeline-image">
                                <img src="/images/y3.png" alt="3차년도 일러스트" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Year 4 -->
                <div class="timeline-item reveal delay-3">
                    <div class="timeline-dot bg-orange"></div>
                    <div class="timeline-content">
                        <div class="timeline-layout reverse">
                            <div class="timeline-text">
                                <div class="timeline-year">4차년도 (2029)</div>
                                <h3>실무 플랫폼 패키징 및 글로벌 표준화</h3>
                                <ul>
                                    <li><strong>플랫폼 검증:</strong> 국과수(NFS) 실무 테스트 및 협업 기관(CSAFE) 간 알고리즘 성능 교차 검증</li>
                                    <li><strong>실무 배포:</strong> 수사 기관에서 즉시 활용할 수 있도록 API/Docker 형태의 감정 시스템 배포</li>
                                    <li><strong>글로벌 표준 제안:</strong> AI 기반 필적 감정 결과 보고 프로토콜 확립 및 국제 표준화 기구(OSAC) 제안</li>
                                </ul>
                            </div>
                            <div class="timeline-image">
                                <img src="/images/y4.png" alt="4차년도 일러스트" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`
    },
    'plan.html': {
        title: 'Plan', key: 'plan',
        content: `<section class="page-hero">
        <div class="container">
            <h1 class="reveal">Research Roadmap</h1>
            <p class="reveal delay-1">연구 제안서의 핵심을 시각화한 SAFE-H 프로젝트의 단계별 추진 계획입니다.</p>
        </div>
    </section>

    <!-- Storyboard Section -->
    <section class="storyboard-section">
        <div class="container">
            <div class="storyboard-container">
                
                <!-- Storyboard Item 1 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">01</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p1_1.png" alt="최종연구목표 및 개요">
                        </div>
                        <div class="storyboard-content">
                            <h3>최종연구목표 및 연구내용의 개요</h3>
                            <div class="keywords">
                                <span class="tag">#설명가능한AI</span>
                                <span class="tag">#법과학</span>
                                <span class="tag">#정량적필적분석</span>
                            </div>
                            <p>주관적 직관에 의존하던 기존 필적 감정을 객관적 증거와 통계적 신뢰 기반의 AI 체계로 전환하는 통합 프로세스를 구축합니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 2 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">02</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p1_2.png" alt="공동연구 도식">
                        </div>
                        <div class="storyboard-content">
                            <h3>Glocal R&D 공동연구 체계</h3>
                            <div class="keywords">
                                <span class="tag">#PNU</span>
                                <span class="tag">#PKNU</span>
                                <span class="tag">#CSAFE</span>
                                <span class="tag">#NFS</span>
                            </div>
                            <p>국내외 대학과 수사기관(NFS), 국제 표준 기구(CSAFE)를 잇는 유기적 파이프라인을 통해 한국형 필적 분석 플랫폼의 세계화를 지향합니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 3 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">03</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p2_1.png" alt="통합 워크플로우">
                        </div>
                        <div class="storyboard-content">
                            <h3>K-Forensic 통합 워크플로우</h3>
                            <div class="keywords">
                                <span class="tag">#불확실성측정</span>
                                <span class="tag">#XAI시각화</span>
                                <span class="tag">#증거력산출</span>
                            </div>
                            <p>데이터 분석부터 법정 제출용 리포트 생성까지, AI와 전문가가 협업하는 고신뢰 포렌식 워크플로우를 완성합니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 4 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">04</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p3_2.png" alt="AEV 기반 알고리즘">
                        </div>
                        <div class="storyboard-content">
                            <h3>XAI 원천 기술: AEV 기반 알고리즘</h3>
                            <div class="keywords">
                                <span class="tag">#AEV</span>
                                <span class="tag">#잠재벡터</span>
                                <span class="tag">#획단위시각화</span>
                            </div>
                            <p>알파벳 표현 수치(AEV)를 활용하여 딥러닝의 블랙박스를 해소하고, 판정의 핵심 근거를 시각적으로 제시합니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 5 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">05</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p3_3.png" alt="다국어 데이터셋">
                        </div>
                        <div class="storyboard-content">
                            <h3>글로벌 다국어 데이터셋 구축</h3>
                            <div class="keywords">
                                <span class="tag">#K-Dataset</span>
                                <span class="tag">#다국어필적</span>
                                <span class="tag">#보안서버</span>
                            </div>
                            <p>한글 및 8개국어 이상의 방대한 다국어 필적 자산을 연계하여, 언어 독립적인 범용 필적 분석 모델의 기반을 닦습니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 6 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">06</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p3_1.png" alt="LDA-Tuning 경량 전이학습">
                        </div>
                        <div class="storyboard-content">
                            <h3>LDA-Tuning 기반 경량 전이학습</h3>
                            <div class="keywords">
                                <span class="tag">#LDA-Tuning</span>
                                <span class="tag">#모형경량화</span>
                                <span class="tag">#효율적학습</span>
                            </div>
                            <p>핵심 인코더 가중치는 보존하고 판별층만 학습하는 효율적 접근을 통해, 다양한 언어 환경에 즉각 대응 가능한 경량 모델을 구축합니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 7 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">07</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p4_2.png" alt="Vector SHAP 분석">
                        </div>
                        <div class="storyboard-content">
                            <h3>Vector SHAP 기반 획 기여도 분석</h3>
                            <div class="keywords">
                                <span class="tag">#VectorSHAP</span>
                                <span class="tag">#획세그먼트</span>
                                <span class="tag">#포렌식해석</span>
                            </div>
                            <p>픽셀 단위가 아닌 '획(Stroke)' 단위 기여도를 산출하여, 감정관과 법관이 직관적으로 이해할 수 있는 정량적 증거를 제공합니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 8 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">08</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p4_1.png" alt="불확실성 정량화">
                        </div>
                        <div class="storyboard-content">
                            <h3>불확실성(Uncertainty) 정량화 모듈</h3>
                            <div class="keywords">
                                <span class="tag">#의사결정모듈</span>
                                <span class="tag">#신뢰도지표</span>
                                <span class="tag">#과신억제</span>
                            </div>
                            <p>AI의 판단 결과와 함께 그 신뢰도를 통계적으로 산출하여, 오판의 위험을 줄이고 인간-AI 협업의 안전성을 높입니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 9 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">09</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p5_1.png" alt="분석 사례">
                        </div>
                        <div class="storyboard-content">
                            <h3>통계적 의사결정 및 사례 검증</h3>
                            <div class="keywords">
                                <span class="tag">#모호한매칭</span>
                                <span class="tag">#임계치보정</span>
                                <span class="tag">#현장실증</span>
                            </div>
                            <p>실제 일치/불일치 사례에 대한 정밀 검증을 통해 시스템의 강건성을 확보하고 법과학적 타당성을 입증합니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 10 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">10</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p6_1.png" alt="부분 위조 탐지">
                        </div>
                        <div class="storyboard-content">
                            <h3>MIL 기반 부분 위조 탐지</h3>
                            <div class="keywords">
                                <span class="tag">#부분위조</span>
                                <span class="tag">#MIL</span>
                                <span class="tag">#히트맵시각화</span>
                            </div>
                            <p>문서 전체뿐만 아니라 특정 단어의 변조를 탐지하는 다중 인스턴스 학습(MIL) 기술로 정밀한 포렌식 분석을 지원합니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 11 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">11</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p8_1.png" alt="3대 추진 전략">
                        </div>
                        <div class="storyboard-content">
                            <h3>SAFE-H 3대 핵심 추진 전략</h3>
                            <div class="keywords">
                                <span class="tag">#블랙박스해체</span>
                                <span class="tag">#글로벌표준</span>
                                <span class="tag">#경량고도화</span>
                            </div>
                            <p>블랙박스 해체 통한 투명성 확보, 글로벌 거버넌스 기반 표준화, 저사양 실무 환경 대응 경량화를 통해 포렌식 AI의 미래를 엽니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 12 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">12</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p10_1.png" alt="연구개발성과의 활용방안 및 파급효과">
                        </div>
                        <div class="storyboard-content">
                            <h3>연구개발성과의 활용방안 및 파급효과</h3>
                            <div class="keywords">
                                <span class="tag">#Busan-Hub</span>
                                <span class="tag">#국가수사기관</span>
                                <span class="tag">#글로벌표준</span>
                            </div>
                            <p>국제 공동연구 및 학술 확산, 사법·수사 실무 적용, 산업·금융 분야 확장 등 전방위적 활용을 통해 K-Forensic의 위상을 높입니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Storyboard Item 13 -->
                <div class="storyboard-item reveal">
                    <div class="step-number">13</div>
                    <div class="storyboard-card">
                        <div class="storyboard-image">
                            <img src="images/plan/img_p10_2.png" alt="5대 핵심 기대효과">
                        </div>
                        <div class="storyboard-content">
                            <h3>포렌식 필적 감정 AI 플랫폼: 5대 핵심 기대효과</h3>
                            <div class="keywords">
                                <span class="tag">#감정효율70%향상</span>
                                <span class="tag">#SCI논문11편</span>
                                <span class="tag">#지역혁신성장</span>
                            </div>
                            <p>기술적·산업적 파급효과부터 사회적 신뢰 증진까지, 5대 핵심 지표 달성을 통해 과학수사의 지능화 및 대중화를 실현합니다.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>`
    },
    'collaboration.html': {
        title: 'Collaboration', key: 'collaboration',
        content: `<section id="collaboration" class="section" style="padding-top:120px;">
        <div class="container">
            <div class="collab-layout">
                <div class="collab-text reveal">
                    <h2>글로벌 포렌식 4각 거버넌스</h2>
                    <p>현장 실효성 검증과 국내외 글로벌 표준화(ISO/IEC 등) 체계를 확립하기 위한 유기적 Glocal 융합 R&D 파트너십</p>
                    <ul class="collab-list">
                        <li><strong>PNU (부산대학교)</strong> : 다국어 통합 데이터 전처리 및 경량화 정합 XAI 개발</li>
                        <li><strong>PKNU (부경대학교)</strong> : 시계열 기반 이상 신호 탐지 및 UQ·신뢰성 우도비 검토</li>
                        <li><strong>CSAFE (미국)</strong> : 국제 다국어 데이터 공유 및 세계 수준 성능 교차 자문</li>
                        <li><strong>NFS (국립과학수사연구원)</strong> : 실무 기반 평가 및 플랫폼 현장 배포, 법정 증거 피드백</li>
                    </ul>
                </div>
                <div class="collab-visual reveal delay-1">
                    <div class="circle-diagram">
                        <div class="circle center">SAFE-H<br>Core</div>
                        <div class="circle node top"><i class="fas fa-university"></i> PNU</div>
                        <div class="circle node right"><i class="fas fa-chart-line"></i> PKNU</div>
                        <div class="circle node bottom"><i class="fas fa-globe-americas"></i> CSAFE</div>
                        <div class="circle node left"><i class="fas fa-fingerprint"></i> NFS</div>
                    </div>
                </div>
            </div>
        </div>
    </section>`
    },
    'team.html': {
        title: 'Team', key: 'team',
        content: `<section id="team" class="section bg-light" style="padding-top:120px;">
        <div class="container">
            <h2 class="section-title reveal">핵심 연구진</h2>
            <p class="section-subtitle reveal">통계학적 무결성과 딥러닝 혁신을 조화하는 최고 전문가</p>
            <div class="team-grid">
                <div class="team-card reveal">
                    <div class="team-avatar"><i class="fas fa-user-circle"></i></div>
                    <div class="team-info">
                        <h3>박소영 교수</h3>
                        <p class="role">연구책임자 (PI)</p>
                        <p class="org">부산대학교 통계학과</p>
                        <p class="desc">미국 CSAFE Post-doc 출신. 범죄 패턴 증거 분석 알고리즘, 이미지 분석 선도 전문가. 족적 및 필적 딥러닝 매칭 알고리즘의 법사법 실제 판례 적용 성과 보유.</p>
                    </div>
                </div>
                <div class="team-card reveal delay-1">
                    <div class="team-avatar"><i class="fas fa-user-circle"></i></div>
                    <div class="team-info">
                        <h3>최지은 교수</h3>
                        <p class="role">공동연구원 (Co-PI)</p>
                        <p class="org">국립부경대학교 통계·데이터사이언스학과</p>
                        <p class="desc">시계열 분석 및 딥러닝 전문가. Vector SHAP, Bootstrapping 기반 검출 및 다변량 수리 통계 모형 설계, 필적 동역학 연구 총괄.</p>
                    </div>
                </div>
                <div class="team-card reveal delay-2">
                    <div class="team-avatar"><i class="fas fa-user-circle"></i></div>
                    <div class="team-info">
                        <h3>Alicia L. Carriquiry 교수</h3>
                        <p class="role">국제 협력 (International Collaboration)<br>CSAFE 디렉터</p>
                        <p class="org">Iowa State University, Distinguished Professor</p>
                        <p class="desc">CSAFE(Center for Statistics and Applications in Forensic Evidence)의 설립자이자 디렉터. 베이지안 통계 및 법과학 데이터 사이언스 분야의 세계적 권위자로, SAFE-H 프로젝트의 국제 데이터 공유 및 기술 자문을 총괄합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`
    },
    'publications.html': {
        title: 'Publications', key: 'publications',
        content: `    <section id="publications" class="section" style="padding-top:120px;">
        <div class="container">
            <h2 class="section-title reveal">연구 성과 목록</h2>
            <p class="section-subtitle reveal">참여 연구진의 통계학 및 법과학 분야 주요 학술지 게제 실적 및 원천 기술</p>
            
            <!-- Section 1: Soyoung Park -->
            <div class="pub-professor-header reveal">
                <div class="prof-avatar"><i class="fas fa-user-tie"></i></div>
                <div class="prof-info">
                    <p class="role">연구책임자 (Principal Investigator)</p>
                    <h3>박소영 교수</h3>
                    <p class="org">부산대학교 통계학과 / 이미지 분석 및 패턴 증거 전문가</p>
                </div>
            </div>
            <div class="pubs-list">
                ${generatePubItems(parkPublications)}
            </div>

            <!-- Section 2: Ji-Eun Choi -->
            <div class="pub-professor-header reveal" style="margin-top:100px; border-left-color: var(--accent-purple);">
                <div class="prof-avatar"><i class="fas fa-user-edit"></i></div>
                <div class="prof-info">
                    <p class="role">공동연구원 (Co-Investigator)</p>
                    <h3>최지은 교수</h3>
                    <p class="org">국립부경대학교 통계·데이터사이언스학과 / 시계열 및 이상 탐지 전문가</p>
                </div>
            </div>
            <div class="pubs-list">
                ${generatePubItems(choiPublications)}
            </div>
        </div>
    </section>`
    }
};

for (const [filename, data] of Object.entries(pages)) {
    const kw = {
        title: data.title,
        research_active: '', research_mobile_active: '',
        plan_active: '', plan_mobile_active: '',
        collaboration_active: '', collaboration_mobile_active: '',
        team_active: '', team_mobile_active: '',
        publications_active: '', publications_mobile_active: ''
    };
    
    // Set active states
    const key = data.key;
    kw[key + '_active'] = 'class="active"';
    kw[key + '_mobile_active'] = 'active';
    
    let html = headerHtml;
    for (const [k, v] of Object.entries(kw)) {
        html = html.replace(new RegExp("{" + k + "}", 'g'), v);
    }
    html = html + "\n" + data.content + "\n" + footerHtml;
    
    fs.writeFileSync(path.join(baseDir, filename), html, 'utf-8');
}

console.log("Pages generated successfully via Node.");
