import os

base_dir = r"c:\Users\user\Desktop\safe-h\website"

header_html = """<!DOCTYPE html>
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
    <header id="header">
        <div class="nav-container">
            <div class="logo">
                <a href="/index.html">SAFE-H</a>
            </div>
            <nav class="nav-links">
                <a href="/index.html#about">About</a>
                <a href="/research.html" {res_active}>Research</a>
                <a href="/collaboration.html" {col_active}>Collaboration</a>
                <a href="/team.html" {team_active}>Team</a>
                <a href="/publications.html" {pub_active}>Publications</a>
                <a href="#" class="contact-trigger">Contact</a>
            </nav>
            <div class="hamburger">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>

    <div class="mobile-menu">
        <a href="/index.html#about" class="mobile-link">About</a>
        <a href="/research.html" class="mobile-link {res_active_m}">Research</a>
        <a href="/collaboration.html" class="mobile-link {col_active_m}">Collaboration</a>
        <a href="/team.html" class="mobile-link {team_active_m}">Team</a>
        <a href="/publications.html" class="mobile-link {pub_active_m}">Publications</a>
        <a href="#" class="mobile-link contact-trigger">Contact</a>
    </div>
"""

footer_html = """    <footer class="site-footer">
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
                <div data-fs-success class="form-success">메시지가 전송되었습니다! 감사합니다.</div>
                <div data-fs-error class="form-error"></div>
                <form id="contact-form" class="styled-form">
                    <div class="form-group">
                        <label for="email">이메일 (Email)</label>
                        <input type="email" id="email" name="email" data-fs-field required placeholder="example@email.com" />
                        <span data-fs-error="email" class="field-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="message">메시지 (Message)</label>
                        <textarea id="message" name="message" data-fs-field required rows="5" placeholder="문의하실 내용을 입력해 주세요."></textarea>
                        <span data-fs-error="message" class="field-error"></span>
                    </div>
                    <button type="submit" class="btn btn-primary" data-fs-submit-btn>문의 보내기 (Send)</button>
                </form>
            </div>
        </div>
    </div>
    <script type="module" src="/main.js"></script>
</body>
</html>
"""

pages = {
    'research.html': {
        'title': 'Research',
        'key': 'res',
        'content': '''    <section id="research" class="section bg-light" style="padding-top:120px;">
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
    </section>'''
    },
    'collaboration.html': {
        'title': 'Collaboration',
        'key': 'col',
        'content': '''    <section id="collaboration" class="section" style="padding-top:120px;">
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
    </section>'''
    },
    'team.html': {
        'title': 'Team',
        'key': 'team',
        'content': '''    <section id="team" class="section bg-light" style="padding-top:120px;">
        <div class="container">
            <h2 class="section-title reveal">핵심 연구진</h2>
            <p class="section-subtitle reveal">통계학적 무결성과 딥러닝 혁신을 조화하는 최고 전문가</p>
            <div class="team-grid">
                <div class="team-card reveal">
                    <div class="team-avatar"><i class="fas fa-user-circle"></i></div>
                    <div class="team-info">
                        <h3>박소영 부교수</h3>
                        <p class="role">연구책임자 (PI)</p>
                        <p class="org">부산대학교 통계학과</p>
                        <p class="desc">미국 CSAFE Post-doc 출신. 범죄 패턴 증거 분석 알고리즘, 이미지 분석 선도 전문가. 족적 및 필적 딥러닝 매칭 알고리즘의 법사법 실제 판례 적용 성과 보유.</p>
                    </div>
                </div>
                <div class="team-card reveal delay-1">
                    <div class="team-avatar"><i class="fas fa-user-circle"></i></div>
                    <div class="team-info">
                        <h3>최지은 부교수</h3>
                        <p class="role">공동연구원 (Co-PI)</p>
                        <p class="org">국립부경대학교 통계·데이터사이언스학과</p>
                        <p class="desc">시계열 분석 및 딥러닝 전문가. Vector SHAP, Bootstrapping 기반 검출 및 다변량 수리 통계 모형 설계, 필적 동역학 연구 총괄.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>'''
    },
    'publications.html': {
        'title': 'Publications',
        'key': 'pub',
        'content': '''    <section id="publications" class="section" style="padding-top:120px;">
        <div class="container">
            <h2 class="section-title reveal">대표 연구 실적</h2>
            <div class="pubs-list">
                <div class="pub-item reveal">
                    <div class="pub-year">2026</div>
                    <div class="pub-detail">
                        <h4>Enhancing automated shoeprint comparison via synthetic data generation and deep segmentation</h4>
                        <p><strong>Science & Justice</strong> | 박소영 외 3명 | K-Forensic 패턴 인식을 위한 데이터 생성 및 정합 연구</p>
                    </div>
                </div>
                <div class="pub-item reveal">
                    <div class="pub-year">2024</div>
                    <div class="pub-detail">
                        <h4>A deep learning approach for the comparison of handwritten documents using latent feature vectors</h4>
                        <p><strong>Statistical Analysis and Data Mining</strong> | 박소영 외 3명 | 딥러닝의 잠재 특징 벡터를 활용한 투명한 객관적 필적 유사도 정량 논문</p>
                    </div>
                </div>
                <div class="pub-item reveal">
                    <div class="pub-year">2024</div>
                    <div class="pub-detail">
                        <h4>Vector SHAP values for machine learning time series forecasting</h4>
                        <p><strong>Journal of Forecasting</strong> | 최지은 외 3명 | 설명 가능한 모델을 위한 새 시계열 해석 프레임워크 기술, 부분 위조 탐지의 코어 이론</p>
                    </div>
                </div>
                <div class="pub-item reveal">
                    <div class="pub-year">2023</div>
                    <div class="pub-detail">
                        <h4>A finely tuned deep transfer learning algorithm to compare outsole images</h4>
                        <p><strong>Statistical Analysis and Data Mining</strong> | 박소영 외 3명 | Shoe-MS 기반 범죄 현장과 패턴의 정교한 분류.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>'''
    }
}

for filename, data in pages.items():
    kw = {
        'title': data['title'],
        'res_active': '', 'res_active_m': '',
        'col_active': '', 'col_active_m': '',
        'team_active': '', 'team_active_m': '',
        'pub_active': '', 'pub_active_m': ''
    }
    key = data['key']
    kw[f"{key}_active"] = 'style="color: var(--primary-color);"'
    kw[f"{key}_active_m"] = 'active'
    
    html = header_html.format(**kw) + "\n" + data['content'] + "\n" + footer_html
    with open(os.path.join(base_dir, filename), "w", encoding="utf-8") as f:
        f.write(html)

print("Pages generated successfully.")
