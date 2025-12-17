/* Football Fractions - Diagnostic Assessment Logic */

const Diagnostic = {
  currentSection: 0,
  currentQuestion: 0,
  answers: {},
  startTime: null,

  sections: [
    {
      id: 'equal-parts-recognition',
      title: 'Spotting Equal Parts',
      description: 'Let\'s see if you can find shapes split into TRULY equal pieces!',
      questions: [
        {
          id: 'epr1',
          type: 'multiple-choice-visual',
          prompt: 'Look carefully! Which rectangle is cut into 4 EQUAL parts? (Hint: Equal means same size!)',
          options: [
            { id: 'a', svg: 'rect-unequal-1', label: 'A' },
            { id: 'b', svg: 'rect-equal-4', label: 'B', correct: true },
            { id: 'c', svg: 'rect-unequal-2', label: 'C' },
            { id: 'd', svg: 'rect-unequal-3', label: 'D' }
          ],
          interpretation: {
            correct: 'Correctly identifies equal parts',
            incorrect: 'May confuse "same number of pieces" with "equal parts"'
          }
        },
        {
          id: 'epr2',
          type: 'multiple-choice-visual',
          prompt: 'Which circle has exactly 1/3 (one-third) colored in?',
          options: [
            { id: 'a', svg: 'circle-half', label: 'A' },
            { id: 'b', svg: 'circle-unequal-third', label: 'B' },
            { id: 'c', svg: 'circle-third', label: 'C', correct: true },
            { id: 'd', svg: 'circle-quarter', label: 'D' }
          ],
          interpretation: {
            correct: 'Understands unit fractions visually',
            incorrect: 'May not connect fraction notation to visual representation'
          }
        },
        {
          id: 'epr3',
          type: 'multiple-choice-visual',
          prompt: 'Coach needs to split the practice field in half. Which field is divided into 2 EQUAL halves?',
          options: [
            { id: 'a', svg: 'field-unequal-half', label: 'A' },
            { id: 'b', svg: 'field-equal-half', label: 'B', correct: true },
            { id: 'c', svg: 'field-thirds', label: 'C' },
            { id: 'd', svg: 'field-unequal-half-2', label: 'D' }
          ],
          footballContext: true,
          interpretation: {
            correct: 'Applies equal parts concept to real contexts',
            incorrect: 'Needs practice with equal parts in applied settings'
          }
        },
        {
          id: 'epr4',
          type: 'select-all',
          prompt: 'This one\'s tricky! Pick ALL the shapes that are split into equal parts. (There\'s more than one!)',
          options: [
            { id: 'a', svg: 'shape-equal-1', label: 'A', correct: true },
            { id: 'b', svg: 'shape-unequal-1', label: 'B' },
            { id: 'c', svg: 'shape-equal-2', label: 'C', correct: true },
            { id: 'd', svg: 'shape-unequal-2', label: 'D' },
            { id: 'e', svg: 'shape-equal-3', label: 'E', correct: true }
          ],
          interpretation: {
            allCorrect: 'Strong understanding of equal parts',
            someCorrect: 'Partial understanding - review with physical manipulatives',
            incorrect: 'Fundamental gap - start with concrete activities'
          }
        },
        {
          id: 'epr5',
          type: 'yes-no-explain',
          prompt: 'Your teammate says "This shape shows 1/4 because it has 4 pieces." Do you agree? Look at the shape and decide!',
          svg: 'rect-4-unequal',
          correctAnswer: 'no',
          interpretation: {
            correct: 'Understands equal parts requirement',
            incorrect: 'Conflates "number of pieces" with "equal parts"'
          }
        }
      ]
    },
    {
      id: 'equal-parts-creation',
      title: 'Making Equal Parts',
      description: 'Now YOU get to divide shapes into equal pieces!',
      questions: [
        {
          id: 'epc1',
          type: 'draw',
          prompt: 'Draw lines to split this rectangle into 4 EQUAL parts. Here\'s a secret: there\'s more than one way to do it!',
          svg: 'empty-rectangle',
          interpretation: {
            note: 'Review manually - look for equal-sized regions'
          }
        },
        {
          id: 'epc2',
          type: 'draw',
          prompt: 'The Eagles need this practice field split into 10 equal zones for drills. Can you draw the lines to make 10 equal sections?',
          svg: 'empty-field',
          footballContext: true,
          interpretation: {
            note: 'Should show 9 vertical lines creating 10 equal strips'
          }
        }
      ]
    },
    {
      id: 'fraction-magnitude',
      title: 'Comparing Fractions',
      description: 'Let\'s see if you can figure out which fraction is bigger!',
      questions: [
        {
          id: 'fm1',
          type: 'compare-explain',
          prompt: 'Here\'s a brain teaser: Which is bigger, 1/3 or 1/4? Think about it - and tell me WHY you chose your answer!',
          fractionA: { num: 1, den: 3 },
          fractionB: { num: 1, den: 4 },
          correctAnswer: 'a',
          interpretation: {
            correct: 'Understands inverse relationship of unit fractions',
            incorrect: 'May think larger denominator = larger fraction'
          }
        },
        {
          id: 'fm2',
          type: 'compare-explain',
          prompt: 'Which is bigger: 3/8 or 5/8? How do you know?',
          fractionA: { num: 3, den: 8 },
          fractionB: { num: 5, den: 8 },
          correctAnswer: 'b',
          interpretation: {
            correct: 'Understands more pieces of same size = larger',
            incorrect: 'May have difficulty with same-denominator comparisons'
          }
        },
        {
          id: 'fm3',
          type: 'compare-explain',
          prompt: 'Interesting one: Which is bigger, 2/4 or 1/2? Or... is there a twist here?',
          fractionA: { num: 2, den: 4 },
          fractionB: { num: 1, den: 2 },
          correctAnswer: 'equal',
          interpretation: {
            correct: 'Recognizes equivalent fractions',
            incorrect: 'May not see equivalence - key concept gap'
          }
        },
        {
          id: 'fm4',
          type: 'order',
          prompt: 'Can you put these in order from smallest to biggest? 1/2, 1/8, 1/4. Drag them into the right spots!',
          fractions: [
            { num: 1, den: 2 },
            { num: 1, den: 8 },
            { num: 1, den: 4 }
          ],
          correctOrder: [1, 2, 0], // indices: 1/8, 1/4, 1/2
          interpretation: {
            correct: 'Can order unit fractions correctly',
            incorrect: 'Needs work on unit fraction magnitude'
          }
        }
      ]
    },
    {
      id: 'improper-fractions',
      title: 'Fractions Bigger Than 1',
      description: 'Did you know fractions can be MORE than 1 whole? Let\'s check it out!',
      questions: [
        {
          id: 'if1',
          type: 'open-response',
          prompt: 'What does 5/4 mean? Try to explain it in your own words. (Hint: Think about pizzas cut into 4 slices!)',
          interpretation: {
            lookFor: ['more than 1 whole', '5 pieces when each whole has 4', '1 and 1/4'],
            redFlag: 'Answer suggests fraction must be less than 1'
          }
        },
        {
          id: 'if2',
          type: 'draw',
          prompt: 'Can you draw a picture that shows 5/4? Here\'s a hint: you\'ll need more than one whole shape!',
          interpretation: {
            note: 'Should show 1 complete shape plus 1/4 of another'
          }
        },
        {
          id: 'if3',
          type: 'convert',
          prompt: 'Jalen Hurts and the Eagles played for 7 quarters over the weekend. How many complete games is that, plus how many extra quarters?',
          footballContext: true,
          improperFraction: { num: 7, den: 4 },
          correctMixed: { whole: 1, num: 3, den: 4 },
          interpretation: {
            correct: 'Can convert improper to mixed in context',
            incorrect: 'Needs concrete practice with quarters/wholes'
          }
        }
      ]
    },
    {
      id: 'operations',
      title: 'Adding Fractions',
      description: 'Time to put those fractions together!',
      questions: [
        {
          id: 'op1',
          type: 'solve-explain',
          prompt: 'What\'s 2/5 + 1/5? Take your time!',
          operation: 'add',
          fractionA: { num: 2, den: 5 },
          fractionB: { num: 1, den: 5 },
          correctAnswer: { num: 3, den: 5 },
          interpretation: {
            correct: 'Can add like fractions',
            incorrect: 'May add denominators or make procedural errors'
          }
        },
        {
          id: 'op2',
          type: 'explain-why',
          prompt: 'Here\'s a thinking question: WHY does 2/5 + 1/5 equal 3/5 and NOT 3/10? What would you tell a friend who wasn\'t sure?',
          relatedTo: 'op1',
          interpretation: {
            lookFor: ['same size pieces', 'counting fifths', 'denominator names the size'],
            redFlag: 'Cannot explain why denominators stay same'
          }
        },
        {
          id: 'op3',
          type: 'word-problem',
          prompt: 'Justin Jefferson makes two amazing catches! On the first play, he gains 3/10 of the field. On the second play, he gains 4/10 more. What fraction of the field did Justin cover in total?',
          footballContext: true,
          correctAnswer: { num: 7, den: 10 },
          interpretation: {
            correct: 'Can apply fraction addition to word problems',
            incorrect: 'May struggle with application even if computation is correct'
          }
        }
      ]
    }
  ],

  /**
   * Initialize the diagnostic
   */
  init() {
    this.currentSection = 0;
    this.currentQuestion = 0;
    this.answers = {};
    this.startTime = Date.now();

    // Check for saved progress
    const savedProgress = Storage.getDiagnosticProgress();
    if (savedProgress && Date.now() - savedProgress.savedAt < 3600000) { // Within 1 hour
      if (confirm('You have a saved diagnostic in progress. Would you like to continue where you left off?')) {
        this.currentSection = savedProgress.section;
        this.currentQuestion = savedProgress.question;
        this.answers = savedProgress.answers;
      }
    }

    this.render();
  },

  /**
   * Get total question count
   */
  getTotalQuestions() {
    return this.sections.reduce((sum, s) => sum + s.questions.length, 0);
  },

  /**
   * Get current question number (overall)
   */
  getCurrentQuestionNumber() {
    let count = 0;
    for (let i = 0; i < this.currentSection; i++) {
      count += this.sections[i].questions.length;
    }
    return count + this.currentQuestion + 1;
  },

  /**
   * Get current section and question
   */
  getCurrentQuestion() {
    return this.sections[this.currentSection]?.questions[this.currentQuestion];
  },

  /**
   * Save answer for current question
   */
  saveAnswer(answer) {
    const question = this.getCurrentQuestion();
    if (question) {
      this.answers[question.id] = {
        answer,
        timestamp: Date.now()
      };

      // Auto-save progress
      Storage.saveDiagnosticProgress({
        section: this.currentSection,
        question: this.currentQuestion,
        answers: this.answers
      });
    }
  },

  /**
   * Move to next question
   */
  next() {
    const section = this.sections[this.currentSection];
    if (this.currentQuestion < section.questions.length - 1) {
      this.currentQuestion++;
    } else if (this.currentSection < this.sections.length - 1) {
      this.currentSection++;
      this.currentQuestion = 0;
    } else {
      this.complete();
      return;
    }
    this.render();
  },

  /**
   * Move to previous question
   */
  previous() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    } else if (this.currentSection > 0) {
      this.currentSection--;
      this.currentQuestion = this.sections[this.currentSection].questions.length - 1;
    }
    this.render();
  },

  /**
   * Complete the diagnostic
   */
  complete() {
    const results = this.calculateResults();
    Storage.saveDiagnosticResults(results);
    Storage.clearDiagnosticProgress();
    this.renderResults(results);
  },

  /**
   * Calculate results and interpretations
   */
  calculateResults() {
    const results = {
      completedAt: new Date().toISOString(),
      duration: Math.round((Date.now() - this.startTime) / 1000),
      sections: {},
      overallScore: 0,
      strengths: [],
      areasForGrowth: [],
      recommendations: []
    };

    let totalCorrect = 0;
    let totalQuestions = 0;

    this.sections.forEach(section => {
      const sectionResults = {
        correct: 0,
        total: section.questions.length,
        details: []
      };

      section.questions.forEach(question => {
        const answer = this.answers[question.id];
        const isCorrect = this.checkAnswer(question, answer?.answer);

        sectionResults.details.push({
          questionId: question.id,
          answer: answer?.answer,
          correct: isCorrect,
          interpretation: this.getInterpretation(question, isCorrect, answer?.answer)
        });

        if (isCorrect) {
          sectionResults.correct++;
          totalCorrect++;
        }
        totalQuestions++;
      });

      sectionResults.percentage = Math.round((sectionResults.correct / sectionResults.total) * 100);
      results.sections[section.id] = sectionResults;

      // Determine strengths and growth areas
      if (sectionResults.percentage >= 80) {
        results.strengths.push(section.title);
      } else if (sectionResults.percentage < 60) {
        results.areasForGrowth.push(section.title);
      }
    });

    results.overallScore = Math.round((totalCorrect / totalQuestions) * 100);

    // Generate recommendations
    results.recommendations = this.generateRecommendations(results);

    return results;
  },

  /**
   * Check if an answer is correct
   */
  checkAnswer(question, answer) {
    if (!answer) return false;

    switch (question.type) {
      case 'multiple-choice-visual':
        const correctOption = question.options.find(o => o.correct);
        return answer === correctOption?.id;

      case 'select-all':
        const correctIds = question.options.filter(o => o.correct).map(o => o.id).sort();
        const selectedIds = (Array.isArray(answer) ? answer : []).sort();
        return JSON.stringify(correctIds) === JSON.stringify(selectedIds);

      case 'yes-no-explain':
        return answer.choice === question.correctAnswer;

      case 'compare-explain':
        return answer.choice === question.correctAnswer;

      case 'order':
        return JSON.stringify(answer) === JSON.stringify(question.correctOrder);

      case 'convert':
        return answer.whole === question.correctMixed.whole &&
               answer.num === question.correctMixed.num &&
               answer.den === question.correctMixed.den;

      case 'solve-explain':
      case 'word-problem':
        return answer.num === question.correctAnswer.num &&
               answer.den === question.correctAnswer.den;

      case 'draw':
      case 'open-response':
      case 'explain-why':
        // These require manual review
        return null;

      default:
        return false;
    }
  },

  /**
   * Get interpretation for a question
   */
  getInterpretation(question, isCorrect, answer) {
    if (isCorrect === null) {
      return question.interpretation.note || 'Requires manual review';
    }
    return isCorrect ?
      question.interpretation.correct :
      question.interpretation.incorrect;
  },

  /**
   * Generate learning recommendations
   */
  generateRecommendations(results) {
    const recommendations = [];

    // Equal parts
    if (results.sections['equal-parts-recognition']?.percentage < 80 ||
        results.sections['equal-parts-creation']?.percentage < 80) {
      recommendations.push({
        lesson: 1,
        title: 'Equal Parts',
        priority: 'high',
        reason: 'Let\'s nail down equal parts first - it\'s the key to everything!',
        activities: [
          'Paper folding activities',
          'Play-doh division',
          'Fair sharing problems'
        ]
      });
    }

    // Improper fractions
    if (results.sections['improper-fractions']?.percentage < 70) {
      recommendations.push({
        lesson: 2,
        title: 'Fractions Bigger Than 1',
        priority: 'high',
        reason: 'Time to see that fractions can be MORE than 1 whole!',
        activities: [
          'Build fractions with circles/tiles',
          'Football quarters context',
          'Number line walks'
        ]
      });
    }

    // Operations
    if (results.sections['operations']?.percentage < 70) {
      recommendations.push({
        lesson: 3,
        title: 'Adding Fractions',
        priority: 'medium',
        reason: 'Let\'s practice combining fractions - like adding up yard gains!',
        activities: [
          'Combine fraction pieces physically',
          'Bar model addition',
          '"Same sized pieces" emphasis'
        ]
      });
    }

    // Fraction magnitude
    if (results.sections['fraction-magnitude']?.percentage < 70) {
      recommendations.push({
        lesson: 6,
        title: 'Fraction Twins',
        priority: 'medium',
        reason: 'Let\'s get better at knowing which fractions are bigger or equal!',
        activities: [
          'Number line placement',
          'Fraction comparison games',
          'Benchmark fractions (1/2, 1/4)'
        ]
      });
    }

    return recommendations;
  },

  /**
   * Render the current state
   */
  render() {
    const container = document.getElementById('diagnosticContainer');
    if (!container) return;

    const section = this.sections[this.currentSection];
    const question = this.getCurrentQuestion();
    const progress = Math.round((this.getCurrentQuestionNumber() / this.getTotalQuestions()) * 100);

    container.innerHTML = `
      <div class="diagnostic-header">
        <div class="diagnostic-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="progress-label">
            <span>Question ${this.getCurrentQuestionNumber()} of ${this.getTotalQuestions()}</span>
            <span>${progress}% Complete</span>
          </div>
        </div>
        <div class="diagnostic-section-info">
          <h3>${section.title}</h3>
          <p class="text-muted">${section.description}</p>
        </div>
      </div>

      <div class="diagnostic-question">
        ${this.renderQuestion(question)}
      </div>

      <div class="diagnostic-navigation">
        <button class="btn btn-secondary" onclick="Diagnostic.previous()" ${this.currentSection === 0 && this.currentQuestion === 0 ? 'disabled' : ''}>
          ← Previous
        </button>
        <button class="btn btn-primary" onclick="Diagnostic.submitAndNext()" id="nextBtn">
          ${this.currentSection === this.sections.length - 1 && this.currentQuestion === section.questions.length - 1 ? 'Finish' : 'Next →'}
        </button>
      </div>
    `;

    // Restore any saved answer for this question
    const savedAnswer = this.answers[question.id];
    if (savedAnswer) {
      this.restoreAnswer(question, savedAnswer.answer);
    }
  },

  /**
   * Render a question based on type
   */
  renderQuestion(question) {
    const footballBadge = question.footballContext ?
      '<span class="badge badge-success">🏈 Football Context</span>' : '';

    let questionHTML = `
      <div class="problem">
        <div class="problem-question">
          ${footballBadge}
          <p>${question.prompt}</p>
        </div>
    `;

    switch (question.type) {
      case 'multiple-choice-visual':
        questionHTML += `
          <div class="choice-group visual-choices">
            ${question.options.map(opt => `
              <label class="choice-option" data-option="${opt.id}">
                <span class="choice-letter">${opt.label}</span>
                <div class="choice-visual">
                  ${this.renderSVG(opt.svg)}
                </div>
              </label>
            `).join('')}
          </div>
        `;
        break;

      case 'select-all':
        questionHTML += `
          <p class="text-muted text-small">Select all that apply</p>
          <div class="choice-group visual-choices select-all">
            ${question.options.map(opt => `
              <label class="choice-option" data-option="${opt.id}">
                <input type="checkbox" value="${opt.id}" style="display:none">
                <span class="choice-letter">${opt.label}</span>
                <div class="choice-visual">
                  ${this.renderSVG(opt.svg)}
                </div>
              </label>
            `).join('')}
          </div>
        `;
        break;

      case 'yes-no-explain':
        questionHTML += `
          <div class="question-visual">
            ${this.renderSVG(question.svg)}
          </div>
          <div class="choice-group">
            <label class="choice-option" data-option="yes">
              <span class="choice-letter">Yes</span>
              <span>Yes, Cooper is right</span>
            </label>
            <label class="choice-option" data-option="no">
              <span class="choice-letter">No</span>
              <span>No, Cooper is not right</span>
            </label>
          </div>
          <div class="thinking-box">
            <div class="thinking-box-header">
              💭 Explain your thinking
            </div>
            <textarea id="explanation" placeholder="Why do you think so?"></textarea>
          </div>
        `;
        break;

      case 'compare-explain':
        questionHTML += `
          <div class="comparison-display">
            <div class="comparison-option" data-option="a">
              ${Fractions.toHTML(question.fractionA.num, question.fractionA.den, 'large')}
            </div>
            <div class="comparison-vs">vs</div>
            <div class="comparison-option" data-option="b">
              ${Fractions.toHTML(question.fractionB.num, question.fractionB.den, 'large')}
            </div>
          </div>
          <div class="choice-group horizontal">
            <label class="choice-option" data-option="a">
              <span class="choice-letter">A</span>
              <span>${question.fractionA.num}/${question.fractionA.den} is larger</span>
            </label>
            <label class="choice-option" data-option="b">
              <span class="choice-letter">B</span>
              <span>${question.fractionB.num}/${question.fractionB.den} is larger</span>
            </label>
            <label class="choice-option" data-option="equal">
              <span class="choice-letter">=</span>
              <span>They are equal</span>
            </label>
          </div>
          <div class="thinking-box">
            <div class="thinking-box-header">
              💭 How do you know?
            </div>
            <textarea id="explanation" placeholder="Explain how you figured this out..."></textarea>
          </div>
        `;
        break;

      case 'order':
        questionHTML += `
          <p class="text-muted">Drag to reorder, or number them 1-3 (1 = smallest)</p>
          <div class="order-items" id="orderItems">
            ${question.fractions.map((f, i) => `
              <div class="order-item" data-index="${i}" draggable="true">
                ${Fractions.toHTML(f.num, f.den, 'large')}
                <input type="number" min="1" max="${question.fractions.length}" class="order-input" data-index="${i}">
              </div>
            `).join('')}
          </div>
        `;
        break;

      case 'draw':
        questionHTML += `
          <div class="draw-area" id="drawArea">
            ${this.renderSVG(question.svg)}
            <p class="text-muted text-center mt-md">Use the space above to draw your answer</p>
          </div>
          <div class="thinking-box">
            <div class="thinking-box-header">
              💭 Describe what you drew
            </div>
            <textarea id="drawDescription" placeholder="Describe your drawing..."></textarea>
          </div>
        `;
        break;

      case 'open-response':
        questionHTML += `
          <div class="thinking-box">
            <div class="thinking-box-header">
              💭 Your answer
            </div>
            <textarea id="openResponse" placeholder="Write your answer here..." rows="4"></textarea>
          </div>
        `;
        break;

      case 'convert':
        questionHTML += `
          <div class="conversion-display">
            <div class="improper-fraction">
              ${Fractions.toHTML(question.improperFraction.num, question.improperFraction.den, 'large')}
              <span class="conversion-equals">=</span>
            </div>
            <div class="mixed-number-inputs">
              <input type="number" id="wholeInput" min="0" placeholder="?" class="number-input"> whole games
              <span>and</span>
              <input type="number" id="numInput" min="0" placeholder="?" class="number-input">
              <span>/</span>
              <input type="number" id="denInput" min="1" placeholder="?" class="number-input"> extra quarters
            </div>
          </div>
        `;
        break;

      case 'solve-explain':
        questionHTML += `
          <div class="equation-display">
            ${Fractions.toHTML(question.fractionA.num, question.fractionA.den, 'large')}
            <span class="operator">${question.operation === 'add' ? '+' : '−'}</span>
            ${Fractions.toHTML(question.fractionB.num, question.fractionB.den, 'large')}
            <span class="operator">=</span>
            <div class="answer-inputs">
              <input type="number" id="answerNum" min="0" placeholder="?" class="number-input">
              <div class="fraction-line"></div>
              <input type="number" id="answerDen" min="1" placeholder="?" class="number-input">
            </div>
          </div>
        `;
        break;

      case 'explain-why':
        questionHTML += `
          <div class="thinking-box">
            <div class="thinking-box-header">
              💭 Explain WHY
            </div>
            <textarea id="explanation" placeholder="Explain your thinking..." rows="4"></textarea>
          </div>
        `;
        break;

      case 'word-problem':
        questionHTML += `
          <div class="problem-context">
            ${question.prompt}
          </div>
          <div class="answer-inputs mt-lg">
            <label>Answer:</label>
            <input type="number" id="answerNum" min="0" placeholder="?" class="number-input">
            <span>/</span>
            <input type="number" id="answerDen" min="1" placeholder="?" class="number-input">
            <span>of the field</span>
          </div>
          <div class="thinking-box mt-lg">
            <div class="thinking-box-header">
              💭 Show your work
            </div>
            <textarea id="workShown" placeholder="How did you solve this?"></textarea>
          </div>
        `;
        break;
    }

    questionHTML += '</div>';
    return questionHTML;
  },

  /**
   * Render SVG for visual questions
   */
  renderSVG(svgId) {
    // SVG definitions for various shapes
    const svgs = {
      'rect-equal-4': `<svg viewBox="0 0 100 60" width="100" height="60">
        <rect x="1" y="1" width="98" height="58" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <line x1="25" y1="1" x2="25" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="50" y1="1" x2="50" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="75" y1="1" x2="75" y2="59" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'rect-unequal-1': `<svg viewBox="0 0 100 60" width="100" height="60">
        <rect x="1" y="1" width="98" height="58" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <line x1="15" y1="1" x2="15" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="50" y1="1" x2="50" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="80" y1="1" x2="80" y2="59" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'rect-unequal-2': `<svg viewBox="0 0 100 60" width="100" height="60">
        <rect x="1" y="1" width="98" height="58" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <line x1="20" y1="1" x2="20" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="60" y1="1" x2="60" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="90" y1="1" x2="90" y2="59" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'rect-unequal-3': `<svg viewBox="0 0 100 60" width="100" height="60">
        <rect x="1" y="1" width="98" height="58" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <line x1="50" y1="1" x2="50" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="50" y1="30" x2="99" y2="30" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'circle-third': `<svg viewBox="0 0 80 80" width="80" height="80">
        <circle cx="40" cy="40" r="38" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <path d="M40,40 L40,2 A38,38 0 0,1 73,59 Z" fill="#FFB300"/>
        <line x1="40" y1="40" x2="40" y2="2" stroke="#2E7D32" stroke-width="1"/>
        <line x1="40" y1="40" x2="73" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="40" y1="40" x2="7" y2="59" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'circle-half': `<svg viewBox="0 0 80 80" width="80" height="80">
        <circle cx="40" cy="40" r="38" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <path d="M40,2 A38,38 0 0,1 40,78 Z" fill="#FFB300"/>
        <line x1="40" y1="2" x2="40" y2="78" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'circle-quarter': `<svg viewBox="0 0 80 80" width="80" height="80">
        <circle cx="40" cy="40" r="38" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <path d="M40,40 L40,2 A38,38 0 0,0 2,40 Z" fill="#FFB300"/>
        <line x1="40" y1="40" x2="40" y2="2" stroke="#2E7D32" stroke-width="1"/>
        <line x1="40" y1="40" x2="2" y2="40" stroke="#2E7D32" stroke-width="1"/>
        <line x1="40" y1="40" x2="78" y2="40" stroke="#2E7D32" stroke-width="1"/>
        <line x1="40" y1="40" x2="40" y2="78" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'circle-unequal-third': `<svg viewBox="0 0 80 80" width="80" height="80">
        <circle cx="40" cy="40" r="38" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <path d="M40,40 L40,2 A38,38 0 0,1 60,72 Z" fill="#FFB300"/>
        <line x1="40" y1="40" x2="40" y2="2" stroke="#2E7D32" stroke-width="1"/>
        <line x1="40" y1="40" x2="60" y2="72" stroke="#2E7D32" stroke-width="1"/>
        <line x1="40" y1="40" x2="10" y2="50" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'field-equal-half': `<svg viewBox="0 0 120 60" width="120" height="60">
        <rect x="1" y="1" width="118" height="58" fill="#2E7D32" stroke="#fff" stroke-width="2"/>
        <line x1="60" y1="1" x2="60" y2="59" stroke="#fff" stroke-width="2"/>
        <text x="30" y="35" fill="#fff" font-size="10" text-anchor="middle">50%</text>
        <text x="90" y="35" fill="#fff" font-size="10" text-anchor="middle">50%</text>
      </svg>`,
      'field-unequal-half': `<svg viewBox="0 0 120 60" width="120" height="60">
        <rect x="1" y="1" width="118" height="58" fill="#2E7D32" stroke="#fff" stroke-width="2"/>
        <line x1="40" y1="1" x2="40" y2="59" stroke="#fff" stroke-width="2"/>
      </svg>`,
      'field-unequal-half-2': `<svg viewBox="0 0 120 60" width="120" height="60">
        <rect x="1" y="1" width="118" height="58" fill="#2E7D32" stroke="#fff" stroke-width="2"/>
        <line x1="80" y1="1" x2="80" y2="59" stroke="#fff" stroke-width="2"/>
      </svg>`,
      'field-thirds': `<svg viewBox="0 0 120 60" width="120" height="60">
        <rect x="1" y="1" width="118" height="58" fill="#2E7D32" stroke="#fff" stroke-width="2"/>
        <line x1="40" y1="1" x2="40" y2="59" stroke="#fff" stroke-width="2"/>
        <line x1="80" y1="1" x2="80" y2="59" stroke="#fff" stroke-width="2"/>
      </svg>`,
      'rect-4-unequal': `<svg viewBox="0 0 100 60" width="100" height="60">
        <rect x="1" y="1" width="98" height="58" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <line x1="15" y1="1" x2="15" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="40" y1="1" x2="40" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="85" y1="1" x2="85" y2="59" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'shape-equal-1': `<svg viewBox="0 0 60 60" width="60" height="60">
        <rect x="1" y="1" width="58" height="58" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <line x1="30" y1="1" x2="30" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="1" y1="30" x2="59" y2="30" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'shape-equal-2': `<svg viewBox="0 0 60 60" width="60" height="60">
        <circle cx="30" cy="30" r="28" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <line x1="30" y1="2" x2="30" y2="58" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'shape-equal-3': `<svg viewBox="0 0 60 60" width="60" height="60">
        <rect x="1" y="1" width="58" height="58" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <line x1="20" y1="1" x2="20" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="40" y1="1" x2="40" y2="59" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'shape-unequal-1': `<svg viewBox="0 0 60 60" width="60" height="60">
        <rect x="1" y="1" width="58" height="58" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <line x1="1" y1="1" x2="59" y2="59" stroke="#2E7D32" stroke-width="1"/>
        <line x1="30" y1="1" x2="30" y2="59" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'shape-unequal-2': `<svg viewBox="0 0 60 60" width="60" height="60">
        <circle cx="30" cy="30" r="28" fill="#e8f5e9" stroke="#2E7D32" stroke-width="2"/>
        <line x1="30" y1="2" x2="30" y2="58" stroke="#2E7D32" stroke-width="1"/>
        <line x1="30" y1="30" x2="58" y2="30" stroke="#2E7D32" stroke-width="1"/>
      </svg>`,
      'empty-rectangle': `<svg viewBox="0 0 200 100" width="200" height="100">
        <rect x="2" y="2" width="196" height="96" fill="#fafafa" stroke="#ccc" stroke-width="2" stroke-dasharray="5,5"/>
      </svg>`,
      'empty-field': `<svg viewBox="0 0 200 80" width="200" height="80">
        <rect x="2" y="2" width="196" height="76" fill="#2E7D32" stroke="#fff" stroke-width="2"/>
        <text x="100" y="45" fill="rgba(255,255,255,0.3)" font-size="12" text-anchor="middle">Draw lines here</text>
      </svg>`
    };

    return svgs[svgId] || `<div class="placeholder">[${svgId}]</div>`;
  },

  /**
   * Submit current answer and move to next
   */
  submitAndNext() {
    const question = this.getCurrentQuestion();
    const answer = this.collectAnswer(question);

    if (answer !== null) {
      this.saveAnswer(answer);
    }

    this.next();
  },

  /**
   * Collect answer from current question
   */
  collectAnswer(question) {
    switch (question.type) {
      case 'multiple-choice-visual': {
        const selected = document.querySelector('.choice-option.selected');
        return selected ? selected.dataset.option : null;
      }

      case 'select-all': {
        const selected = document.querySelectorAll('.choice-option.selected');
        return Array.from(selected).map(el => el.dataset.option);
      }

      case 'yes-no-explain': {
        const selected = document.querySelector('.choice-option.selected');
        const explanation = document.getElementById('explanation')?.value;
        return selected ? { choice: selected.dataset.option, explanation } : null;
      }

      case 'compare-explain': {
        const selected = document.querySelector('.choice-option.selected');
        const explanation = document.getElementById('explanation')?.value;
        return selected ? { choice: selected.dataset.option, explanation } : null;
      }

      case 'order': {
        const inputs = document.querySelectorAll('.order-input');
        const order = [];
        inputs.forEach(input => {
          const pos = parseInt(input.value) - 1;
          const idx = parseInt(input.dataset.index);
          if (!isNaN(pos)) order[pos] = idx;
        });
        return order.length === inputs.length ? order : null;
      }

      case 'draw': {
        const description = document.getElementById('drawDescription')?.value;
        return { description, type: 'drawing' };
      }

      case 'open-response': {
        return document.getElementById('openResponse')?.value || null;
      }

      case 'convert': {
        const whole = parseInt(document.getElementById('wholeInput')?.value);
        const num = parseInt(document.getElementById('numInput')?.value);
        const den = parseInt(document.getElementById('denInput')?.value);
        return !isNaN(whole) && !isNaN(num) && !isNaN(den) ?
          { whole, num, den } : null;
      }

      case 'solve-explain':
      case 'word-problem': {
        const num = parseInt(document.getElementById('answerNum')?.value);
        const den = parseInt(document.getElementById('answerDen')?.value);
        const work = document.getElementById('workShown')?.value;
        return !isNaN(num) && !isNaN(den) ? { num, den, work } : null;
      }

      case 'explain-why': {
        return document.getElementById('explanation')?.value || null;
      }

      default:
        return null;
    }
  },

  /**
   * Restore a saved answer
   */
  restoreAnswer(question, answer) {
    if (!answer) return;

    switch (question.type) {
      case 'multiple-choice-visual':
      case 'yes-no-explain':
      case 'compare-explain': {
        const option = document.querySelector(`[data-option="${answer.choice || answer}"]`);
        if (option) option.classList.add('selected');
        if (answer.explanation) {
          const textarea = document.getElementById('explanation');
          if (textarea) textarea.value = answer.explanation;
        }
        break;
      }

      case 'select-all': {
        answer.forEach(id => {
          const option = document.querySelector(`[data-option="${id}"]`);
          if (option) option.classList.add('selected');
        });
        break;
      }
    }
  },

  /**
   * Render results page
   */
  renderResults(results) {
    const container = document.getElementById('diagnosticContainer');

    const sectionCards = Object.entries(results.sections).map(([id, data]) => {
      const section = this.sections.find(s => s.id === id);
      const scoreColor = data.percentage >= 80 ? 'var(--correct)' :
                        data.percentage >= 60 ? 'var(--thinking)' : 'var(--incorrect)';

      return `
        <div class="card">
          <div class="card-header" style="background: ${scoreColor}">
            <h3 style="margin:0">${section.title}</h3>
          </div>
          <div class="card-body">
            <div class="flex-between">
              <span>Score</span>
              <strong>${data.correct}/${data.total} (${data.percentage}%)</strong>
            </div>
            <div class="progress-bar mt-md">
              <div class="progress-fill" style="width: ${data.percentage}%; background: ${scoreColor}"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const recommendationCards = results.recommendations.map(rec => `
      <div class="alert alert-${rec.priority === 'high' ? 'warning' : 'info'}">
        <div class="alert-title">Lesson ${rec.lesson}: ${rec.title}</div>
        <p>${rec.reason}</p>
        <p class="text-small"><strong>Suggested activities:</strong></p>
        <ul class="text-small">
          ${rec.activities.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="results-header text-center">
        <div class="trophy-icon">🏆</div>
        <h2>Skills Check Complete!</h2>
        <p class="text-muted">Here's how you did on your fraction skills</p>
      </div>

      <div class="scoreboard mt-xl">
        <div class="scoreboard-title">Overall Score</div>
        <div class="scoreboard-value">${results.overallScore}%</div>
        <div class="scoreboard-label">Completed in ${Math.round(results.duration / 60)} minutes</div>
      </div>

      <div class="section-title mt-xl">
        <h2>📊 Section Scores</h2>
      </div>
      <div class="grid grid-2">
        ${sectionCards}
      </div>

      ${results.strengths.length > 0 ? `
        <div class="alert alert-success mt-xl">
          <div class="alert-title">💪 Strengths</div>
          <p>${results.strengths.join(', ')}</p>
        </div>
      ` : ''}

      ${results.areasForGrowth.length > 0 ? `
        <div class="section-title mt-xl">
          <h2>📚 Recommended Focus Areas</h2>
        </div>
        ${recommendationCards}
      ` : ''}

      <div class="flex-center gap-md mt-xl">
        <a href="lessons/" class="btn btn-primary btn-large">Start Learning</a>
        <a href="/" class="btn btn-secondary btn-large">Back to Dashboard</a>
      </div>
    `;
  }
};

// Event delegation for choice selection
document.addEventListener('click', (e) => {
  const option = e.target.closest('.choice-option');
  if (!option) return;

  const group = option.closest('.choice-group');
  if (!group) return;

  if (group.classList.contains('select-all')) {
    // Toggle selection for select-all
    option.classList.toggle('selected');
  } else {
    // Single selection
    group.querySelectorAll('.choice-option').forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
  }
});

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Diagnostic;
}
