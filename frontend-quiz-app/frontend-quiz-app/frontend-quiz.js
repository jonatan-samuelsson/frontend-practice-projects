

class FrontendQuiz {
    constructor(quizData) {
        this.QUIZUI = new FrontendQuiz.QuizUI(this);
        this.QUIZENGINE = new FrontendQuiz.QuizEngine(this, quizData);

    }





    static QuizUI = class {
        constructor(parent) {
            this.parent = parent;
            this.fontData = [
                ['preconnect', 'https://fonts.googleapis.com', 'false'],
                ['preconnect', 'https://fonts.gstatic.com', 'true'],
                ['stylesheet', 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap', 'false']
            ];

            this.styleTags = [
                ...[document.createComment('---FRONTEND QUIZ INJECT---')],
                ...this.createStyleTags(),
                ...[document.createComment('---/FRONTEND QUIZ INJECT---')]
            ]

            this.elements = {
                'head': document.querySelector('head'),
                'containingElement': document.querySelector('.frontend-quiz'),
                'quizParent': Object.assign(document.createElement('div'), { className: 'frontend-quiz-inner' }),
                'topMenu': Object.assign(document.createElement('div'), { className: 'top-menu flex container' }),
                'theme-switcher': Object.assign(document.createElement('div'), { className: 'theme-switcher flex' }),
                'quizContent': Object.assign(document.createElement('div'), { className: 'quiz-content grid container' }),
                'alternatives': [],

            }
            this.elements.containingElement.appendChild(this.elements.quizParent);
            this.elements.quizParent.appendChild(this.elements.topMenu);
            this.elements.quizParent.appendChild(this.elements.quizContent);
            
            

            this.pageGenerators = {
                'landing': this.createLandingPage.bind(this),
                'question': this.createQuestionPage.bind(this),
                'score': this.createScorePage.bind(this)
            };

            this.themes = ['dark', 'light'];

            this.markers = {
                'correct': './frontend-quiz-app/assets/images/icon-correct.svg',
                'incorrect': './frontend-quiz-app/assets/images/icon-error.svg',

            }

            this.correctAnswers = 0;

            this.answerSumbitted = false;

        }

        initialize() {
            this.elements.quizParent.setAttribute('data-theme', 'light');
            this.insertStyleTags();
            this.displayTopMenu();
            this.displayQuizContent();


        }

        insertStyleTags() {
            this.styleTags.forEach((tag) => this.elements.head.appendChild(tag));
        }

        displayTopMenu() {
            this.createTopMenu().forEach((element) => this.elements.topMenu.appendChild(element));

        }

        displayQuizContent(pageType = 'landing') {
            const container = this.elements.quizContent;
            Object.values(container.children).forEach((child) => container.removeChild(child));
            this.pageGenerators[pageType]().forEach((section) => container.appendChild(section));

        }

        startQuiz(topic) {
            this.elements.topMenu.querySelector('.top-logo').appendChild(
                this.createFlexLabel('topic', topic)
            );
            this.displayQuizContent('question');
            this.parent.QUIZENGINE.loadQuiz(topic.title);
            this.populateQuestion([
                ...[this.elements.quizContent],
                ...this.parent.QUIZENGINE.fetchNextQuestion()
            ]
            );
        }


        createStyleTags(styleText) {
            let output = [];
            const styleTag = document.createElement('style');
            styleTag.textContent =
                "/* Injected by frontend-quiz */ \n" +
                "@import url(frontend-quiz-app/css/main.css)\;\n" +
                "@import url(frontend-quiz-app/css/resets.css)\;\n" +
                "@import url(frontend-quiz-app/css/colors.css)\;\n" +
                "@import url(frontend-quiz-app/css/sizing-mediaqueries.css)\;\n" +
                "@import url(frontend-quiz-app/css/themes.css)\;\n";
            output.push(styleTag);
            for (const font of this.fontData) {
                const fontTag = document.createElement('link');
                fontTag.rel = font[0];
                fontTag.href = font[1];
                fontTag.setAttribute('preconnect', font[2]);
                output.push(fontTag);
            }
            return output;
        }


        createTopMenu() {
            let output = [];
            output.push(Object.assign(document.createElement('div'), { className: 'top-logo' }));
            output.push(this.createThemeSwitcher());
            return output;

        }

        createThemeSwitcher() {

            const themeSwitcher = Object.assign(document.createElement('div'), { className: 'theme-switcher flex' });
            const themeToggleButton = Object.assign(document.createElement('label'), { className: 'theme-toggle-button' });
            themeToggleButton.setAttribute('for', 'theme-toggle');

            const themeToggle = Object.assign(document.createElement('input'), { className: 'theme-toggle', id: 'theme-toggle', name: 'theme-toggle' });
            themeToggle.type = 'checkbox';
            themeToggle.addEventListener('change', () => {
                this.toggleTheme();
            });
            themeToggleButton.appendChild(themeToggle);
            themeToggleButton.appendChild(Object.assign(document.createElement('span'), { className: 'checkmark' }));


            themeSwitcher.appendChild(Object.assign(document.createElement('span'), { className: 'theme-icon sun' }));
            themeSwitcher.appendChild(themeToggleButton);
            themeSwitcher.appendChild(Object.assign(document.createElement('span'), { className: 'theme-icon moon' }));
            return themeSwitcher;
        }


        createLandingPage() {
            this.resetQuizParams();
            return [this.createQuizIntro(), this.createQuizMenu()];
        }

        resetQuizParams() {
            this.correctAnswers = 0;
            this.parent.QUIZENGINE.activeQuiz = null;
            this.parent.QUIZENGINE.activeQuestion = null;
            this.answerSumbitted = false;
            const topLogo = this.elements.topMenu.querySelector('.top-logo');
            const topLogoLabel = topLogo.querySelector('.flex-label');
            if (topLogoLabel) topLogo.removeChild(topLogoLabel);

        }

        createQuizIntro() {
            const intro = Object.assign(document.createElement('div'), { className: 'quiz-header flex' });
            intro.appendChild(Object.assign(document.createElement('h1'), { innerHTML: 'Welcome to the <br><span>Frontend Quiz!</span>' }));
            intro.appendChild(Object.assign(document.createElement('p'), { innerHTML: 'Pick a subject to get started.' }));
            return intro;
        }

        createQuizMenu() {
            const menu = Object.assign(document.createElement('div'), { className: 'main flex' });
            const menuUL = Object.assign(document.createElement('ul'), { className: 'menu-list flex' });
            menu.appendChild(menuUL);
            this.parent.QUIZENGINE.fetchMenuItems().forEach((topic) => {
                const menuItem = document.createElement('li');
                const menuLink = Object.assign(document.createElement('a'), { href: '#', className: 'button' });
                menuLink.appendChild(this.createFlexLabel('topic', topic));
                menuLink.addEventListener('click', () => {
                    this.startQuiz(topic);
                })
                menuItem.appendChild(menuLink);
                menuUL.appendChild(menuItem);
            })
            return menu;
        }

        createFlexLabel(type, content) {
            const flexLabel = Object.assign(document.createElement('div'), {
                className: 'grid-label grid'
            });
            const flexIcon = document.createElement('div');
            if (type == 'topic') {
                flexIcon.setAttribute('style', `background-color: ${content.background}`);
                const topicImg = document.createElement('img');
                topicImg.src = content.icon;
                flexIcon.appendChild(topicImg);
            } else if (type == 'alternative') {
                flexIcon.textContent = content.alpha;
                flexIcon.classList.add('alternative-icon');
            }
            flexLabel.appendChild(flexIcon);
            const labelText = Object.assign(Object.assign(
                document.createElement('span'), {
                innerText: content.title, className: 'label-text'
            }));
            flexLabel.appendChild(labelText);
            return flexLabel;

        }

        toggleTheme() {

            this.elements.quizParent.setAttribute('data-theme', this.themes[0]);
            this.themes.splice(0, 0, this.themes.pop());
        }



        createQuestionPage() {
            return [this.createQuestionHeader(), this.createQuestionMain()]
        }

        createQuestionHeader() {


            const questionHeader = Object.assign(
                document.createElement('div'), {
                className: 'quiz-header flex'
            });
            questionHeader.appendChild(Object.assign(
                document.createElement('p'), {
                className: 'question-number'
            })
            );
            questionHeader.appendChild(Object.assign(
                document.createElement('h2'), {
                className: 'question-text'
            })
            );
            questionHeader.appendChild(Object.assign(
                document.createElement('div'), {
                className: 'progress-bar'
            })
            );
            return questionHeader;

        }

        createQuestionMain() {
            const questionMain = Object.assign(
                document.createElement('div'), {
                className: 'main flex'

            }
            );
            questionMain.appendChild(Object.assign(
                document.createElement('ul'), {
                className: 'menu-list flex'
            })
            );

            const submitButton = Object.assign(
                document.createElement('a'), {
                className: 'submit button purple-button',
                innerHTML: '<span>Submit answer</span>'
            });
            submitButton.setAttribute('data-alternative-selected', 'false');
            submitButton.addEventListener('click', (e) => {
                this.submitAnswer(e.currentTarget);
            })
            questionMain.appendChild(submitButton);
            const nextButton = Object.assign(
                document.createElement('a'), {
                className: 'next-question button purple-button hidden',
                innerHTML: '<span>Next question</span>'
            });
            nextButton.addEventListener('click', () => {
                this.displayNextQuestion();
            })
            questionMain.appendChild(Object.assign(document.createElement('div'),
                {
                    className: 'answer-needed flex hidden',
                    innerHTML: '<img src=\"./frontend-quiz-app/assets/images/icon-error.svg\"> <p>Please select an answer</p>'
                }));
            questionMain.appendChild(nextButton);

            return questionMain;

        }

        populateQuestion([questionPage, question, questionCount, questionNumber]) {

            const questionNumberElement = questionPage.querySelector('.question-number');
            const questionTextElement = questionPage.querySelector('.question-text');
            const questionProgressBar = questionPage.querySelector('.progress-bar');
            const questionAlternativesElement = questionPage.querySelector('.menu-list');
            const questionSubmitButton = questionPage.querySelector('.submit');

            questionNumberElement.textContent = `Question ${questionNumber} of ${questionCount}`;
            questionTextElement.textContent = question.question;
            for (const [no, alternative] of Object.entries(question.options)) {
                const alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
                const alternativeListElement = document.createElement('li');
                const alternativeLinkElement = Object.assign(
                    document.createElement('a'), {
                    className: 'button alternative'
                });
                const alternativeLabel = this.createFlexLabel('alternative', {
                    "title": alternative,
                    "alpha": alphabet[no]
                })
                this.elements.alternatives.push(alternativeLinkElement);

                alternativeLinkElement.addEventListener('click', (e) => {
                    this.selectAlternative(e.currentTarget);
                })
                alternativeLabel.appendChild(Object.assign(
                    document.createElement('img'),
                    { className: 'alternative-marker hidden' }
                ));
                alternativeLinkElement.appendChild(alternativeLabel);

                alternativeListElement.appendChild(alternativeLinkElement);
                questionAlternativesElement.appendChild(alternativeListElement);
            }

            questionProgressBar.setAttribute('style', `--progress: ${questionNumber / questionCount}`);
            console.log(questionNumber == questionCount);
            if (questionNumber == questionCount) {

                this.modifyLastQuestion(questionPage);
            }


        }

        modifyLastQuestion(questionPage) {
            const questionMain = questionPage.querySelector('.main');
            const submitButton = questionPage.querySelector('.next-question');
            const scoreButton = Object.assign(document.createElement('a'),
                {
                    className: 'button purple-button next-question hidden',
                    innerHTML: '<span>See result</span>'
                }
            );
            scoreButton.addEventListener('click', () => {
                this.displayQuizContent('score');
            })
            questionMain.removeChild(submitButton);
            questionMain.appendChild(scoreButton);

        }

        selectAlternative(alternative) {
            if (!this.answerSumbitted) {
                this.elements.alternatives.forEach((button) => {
                    if (button == alternative) {
                        button.classList.toggle('selected');
                        this.elements.quizContent.querySelector('.submit').setAttribute(
                            'data-alternative-selected',
                            button.classList.contains('selected')
                        )
                    } else {
                        button.classList.remove('selected');
                    }
                })
            }
        }

        toggleHidden(element) {
            element.classList.toggle('hidden');
        }

        submitAnswer(submitter) {

            const selected = String(submitter.getAttribute('data-alternative-selected'));
            if (selected == 'false') {
                this.answerNeeded();
            } else {
                this.answerSumbitted = true;
                this.correctAnswers += this.evaluateAnswer();
                this.toggleHidden(this.elements.quizContent.querySelector('.submit'));
                this.toggleHidden(this.elements.quizContent.querySelector('.next-question'));
            }
        }

        answerNeeded() {
            const warning = document.querySelector('.answer-needed');
            warning.classList.remove('hidden');
            setTimeout(() => {
                warning.classList.add('hidden');
            }, 3000
            );
        }

        evaluateAnswer() {
            const answer = this.parent.QUIZENGINE.activeQuestion.answer;


            let gotItRight = 0;
            this.elements.alternatives.forEach((alternative) => {

                if (alternative.querySelector('.label-text').innerText == answer) {
                    alternative.classList.add('correct');
                    const marker = alternative.querySelector('.alternative-marker');
                    marker.src = this.markers.correct;
                    marker.classList.remove('hidden');
                    if (alternative.classList.contains('selected')) gotItRight = 1;
                }
                else {
                    alternative.classList.add('incorrect')

                    if (alternative.classList.contains('selected')) {
                        const marker = alternative.querySelector('.alternative-marker');
                        marker.src = this.markers.incorrect;
                        marker.classList.remove('hidden');
                    }
                }

            })
            return gotItRight;
        }

        displayNextQuestion() {
            const nextQuestion = this.parent.QUIZENGINE.fetchNextQuestion();
            this.answerSumbitted = false;
            this.displayQuizContent('question');
            this.populateQuestion([
                ...[this.elements.quizContent],
                ...nextQuestion
            ]);

        }


        createScorePage() {
            return [this.createScoreHeading(), this.createScoreMain()];
        };

        createScoreHeading() {
            const heading = Object.assign(document.createElement('div'), { className: 'quiz-header flex' });
            heading.appendChild(Object.assign(document.createElement('h1'), { innerHTML: 'Quiz completed<br><span>You scored...</span>' }));
            return heading;
        }

        createScoreMain() {
            const activeQuiz = this.parent.QUIZENGINE.activeQuiz;
            console.log(activeQuiz);
            const scoreMain = Object.assign(
                document.createElement('div'), {
                className: 'main flex'
            });

            const scoreDisplay = Object.assign(
                document.createElement('div'),
                { className: 'score-display flex' }
            );
            scoreMain.appendChild(scoreDisplay);
            scoreDisplay.appendChild(this.createFlexLabel('topic', activeQuiz));
            scoreDisplay.appendChild(Object.assign(
                document.createElement('p'),
                {
                    className: 'final-score',
                    textContent: this.correctAnswers,

                }));
            scoreDisplay.appendChild(Object.assign(document.createElement('p'),

                {
                    className: 'out-of',
                    textContent: `out of ${activeQuiz.questionCount}`,
                }));
            const playAgainButton = Object.assign(document.createElement('a'),
                {
                    className: 'button purple-button play-again',
                    textContent: 'Play Again',
                });

            playAgainButton.addEventListener('click', () => {
                this.displayQuizContent('landing');
            });
            scoreMain.appendChild(playAgainButton);
            return scoreMain;

        }
    }

    static QuizEngine = class {
        constructor(parent, quizData) {

            this.parent = parent;
            this.quizzes = quizData;
            this.activeQuiz = null;
            this.activeQuestion = null;

        }


        loadQuiz(topic) {
            let quiz = null;
            Object.values(this.quizzes).forEach((entry) => {
                if (entry.title == topic) quiz = entry;
            });
            this.activeQuiz = JSON.parse(JSON.stringify(quiz));
            this.activeQuiz.questions.reverse();
            this.activeQuiz['questionCount'] = this.activeQuiz.questions.length;

        }

        fetchNextQuestion() {
            this.activeQuestion = this.activeQuiz.questions.pop();
            return [
                this.activeQuestion,
                this.activeQuiz.questionCount,
                this.activeQuiz.questionCount - this.activeQuiz.questions.length
            ];
        }

        fetchMenuItems() {
            let output = [];
            this.quizzes.forEach((topic) => {
                output.push({ 'title': topic.title, 'icon': topic.icon, 'background': topic.background });
            });
            return output;
        }
    }


}





document.addEventListener('DOMContentLoaded', () => {

    fetch("./frontend-quiz-app/frontend-quiz.json").then((response) => {
        if (!response.ok) return console.log('Data error');

        return response.json();

    }).then((data) => {



        const Quiz = new FrontendQuiz(data.quizzes);
        Quiz.QUIZUI.initialize();


    })

})
